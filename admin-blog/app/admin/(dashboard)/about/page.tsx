// src/app/about/page.tsx

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="w-full relative bg-linear-to-b bg-teal-50 pb-16 pt-2">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -left-40 -top-80 h-[550px] w-[550px] rounded-full bg-teal-800 blur-3xl" />
          <div className="absolute -right-40 -bottom-100 h-[450px] w-[450px] rounded-full bg-teal-800 blur-3xl" />
        </div>
        <div className="mx-auto  flex max-w-5xl flex-col items-center px-4 sm:px-0  pt-10 text-center lg:px-0">
          <h1 className="text-4xl z-10 font-semibold tracking-tight text-white sm:text-teal-950 sm:text-5xl lg:text-6xl">
            About Touript
          </h1>
          <p className="mt-3 z-10 text-sm tracking-relaxed text-white sm:text-teal-950/80">
            Learn about our goals, mission and vision
          </p>
        </div>
      </section>

      <main className="mx-auto w-full max-w-2xl px-4 pb-20 pt-10 flex flex-col gap-8 lg:px-0">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            What is touript?
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-6">
            Travel is often seen as a series of destinations, but at Touript,
            it’s recognized as an experience defined by the connections made,
            stories shared, and memories created. Touript is a platform built to
            unite the diverse needs, dreams, and aspirations of travelers from
            every corner of the world.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mb-6">
            With our seamless travel booking feature, finding the perfect trip
            becomes effortless. Beyond this, Farfable—a vibrant, travel-focused
            social community—encourages travelers to tell their stories, engage,
            and discover inspiration alongside fellow explorers. Fireside, our
            dedicated conversation space, offers a place for meaningful
            discussions, where travelers everywhere can engage, learn, and grow
            together.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mb-6">
            At Touript, we’re redefining how journeys are planned, experienced,
            and remembered — transforming travel from a destination into a
            shared adventure that leaves lasting impressions.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Our Story
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-6">
            Our journey began with a simple question: why isn’t there one space
            built exclusively for travelers—a place where every adventure can be
            planned, discussed, and shared openly? Like so many wanderlusters,
            making travel plans often meant jumping between forums, social
            media, and scattered guides to answer vital questions like “Where
            should I go?”, “When’s the best time?”, “What should I pack?”, and
            “What should I avoid?” The fragmented, unreliable information made
            planning harder than it should be.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mb-6">
            At the same time, booking travel often felt unnecessarily
            complicated. Something as simple as reserving a flight could mean
            navigating countless pages, dismissing endless pop-ups, and still
            questioning whether we were getting the best deal. That frustration
            sparked another thought: shouldn’t booking be as effortless as the
            journeys we dream of?
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mb-6">
            That’s why we built <span className="font-bold">Touript</span>—a
            platform designed to eliminate the chaos of fragmented travel
            planning. Here, everything travelers need—finding and booking
            flights, sharing stories, exchanging insights, and connecting with
            fellow explorers—lives in one dedicated space. No more scattered
            apps, no more endless tabs. Just one community where every trip
            begins, grows, and inspires.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Mission</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-6">
            Our mission is to empower people sharing their adventures, seeking
            advice, and exploring genuine connections—without having to rely on
            fragmented social networks or multiple platforms. Touript ensures
            effortless trip planning, and lets travel stories and expertise flow
            in a supportive, traveler-first space.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Vission</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-6">
            We envision the world’s leading community where every
            traveler—adventurer, explorer, or wanderluster—finds all the
            resources, connections, and inspiration they need in one place. As a
            dedicated travel social media platform, Touript strives to make
            travel planning collaborative, transparent, and memorable—fueling
            global journeys with trust, technology, and community-driven
            insight.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Why Choose Us?
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-6">
            At Touript, we’re not just another platform – we’re your ultimate
            travel companion. Here’s why we stand out:
          </p>
          <ul className="list-disc list-inside space-y-4 leading-relaxed text-sm text-gray-700 mb-6">
            <li className="pl-8 leading-relaxed">
              <span className="font-bold text-gray-900">All-in-One Travel Hub</span>: Our platform is a one-stop shop where you
              can easily book your next adventure and connect with like-minded
              travelers. No need to juggle multiple apps—everything you need is
              right here. We know that reserving a flight in traditional booking
              sites often meant navigating countless pages, dismissing endless
              pop-ups, and still wondering if you were getting the best deal—but
              with our booking system, that hassle is gone.
            </li>
            <li className="pl-8 leading-relaxed">
              <span className="font-bold text-gray-900">Focused on What Matters</span>: Unlike general social media, we’re 100%
              dedicated to travel. Whether it’s finding hidden gems, getting
              authentic advice, or sharing your own journey, we’re here to keep
              your travel dreams front and center.
            </li>
            <li className="pl-8 leading-relaxed">
              <span className="font-bold text-gray-900">Genuine Traveler Insights</span>: Get real reviews and firsthand
              experiences from fellow explorers who’ve been there. No fluff, no
              filters—just honest conversations and advice to help you make the
              best decisions.
            </li>
            <li className="pl-8 leading-relaxed">
              <span className="font-bold text-gray-900">Empowering You</span>: We believe every traveler has a story to tell.
              With Touript, you’re not just booking a trip—you’re inspiring
              journeys, connecting with others, and shaping the future of
              travel.
            </li>
          </ul>
          <p className="text-sm text-gray-700 leading-relaxed mb-6">
            We believe, Touript will craft the future—where every fable stitches
            together in a single page for touripters everywhere.
          </p>
        </div>
      </main>
    </div>
  );
}
