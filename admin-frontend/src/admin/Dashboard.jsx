import * as React from "react";
import { useDataProvider } from "react-admin";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export default function Dashboard() {
  const dp = useDataProvider();
  const [metrics, setMetrics] = React.useState({ users: 0, posts: 0 });
  const [series, setSeries] = React.useState([]);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [{ total: usersTotal }, { total: postsTotal }] = await Promise.all([
          dp.getList("users", { pagination: { page: 1, perPage: 1 }, sort: { field: "id", order: "DESC" }, filter: {} }),
          dp.getList("posts", { pagination: { page: 1, perPage: 1 }, sort: { field: "id", order: "DESC" }, filter: {} }),
        ]);
        // fake 7-day sparkline (replace with your /metrics)
        const data = Array.from({ length: 7 }).map((_, i) => ({
          day: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i],
          posts: Math.max(2, Math.round((postsTotal / 7) * (0.6 + Math.random()))),
        }));
        if (mounted) {
          setMetrics({ users: usersTotal, posts: postsTotal });
          setSeries(data);
        }
      } catch (e) {}
    })();
    return () => { mounted = false; };
  }, [dp]);

  const StatCard = ({ label, value }) => (
    <Card>
      <CardContent>
        <Typography variant="overline" color="text.secondary">{label}</Typography>
        <Typography variant="h4" sx={{ mt: 0.5 }}>{value}</Typography>
      </CardContent>
    </Card>
  );

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12} md={3}><StatCard label="Total Users" value={metrics.users} /></Grid>
      <Grid item xs={12} md={3}><StatCard label="Total Posts" value={metrics.posts} /></Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="subtitle1" sx={{ mb: 1.5 }}>Posts (last 7 days)</Typography>
            <div style={{ width: "100%", height: 220 }}>
              <ResponsiveContainer>
                <AreaChart data={series}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="currentColor" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="currentColor" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="posts" stroke="currentColor" fill="url(#g1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
