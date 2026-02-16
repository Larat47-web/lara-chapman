import { motion } from 'framer-motion'
import { usePageContent } from '../hooks/usePageContent'

const About = () => {
  const { content, loading } = usePageContent();

  // Get dynamic content with fallbacks
  const pageTitle = content?.about?.pageTitle || 'Meet Lara Chapman';
  const pageSubtitle = content?.about?.pageSubtitle || 'Experienced Phoenix real estate advisor known for strategy and follow-through.';
  const fullBio = content?.about?.fullBio || `I'm Lara Chapman, a Phoenix Valley REALTOR® and native Phoenician serving clients from Central Phoenix to the East Valley. I've lived here my whole life, and I genuinely love this market. Not just because Phoenix is growing, but because real estate here creates real opportunity. For families, for first-time buyers, and for people trying to build long-term wealth.

If you're relocating to Arizona, buying your first home, or investing in Phoenix real estate, my goal is simple. I want you to feel informed, supported, and confident in your decision.

Why Clients Work With Me

Real estate is rarely just a transaction. It's usually tied to a bigger life moment. A move, a new job, a new chapter, a divorce, a growing family, a parent downsizing, or a financial goal that matters.

My clients don't come to me because they want a pushy salesperson. They come to me because they want a Realtor who listens, communicates clearly, and knows how to guide them when the decision feels big.

That's the type of professional I've always been.

My Background (And Why It Matters in Real Estate)

Before I became a REALTOR®, I worked in finance and operations leadership, which trained me to think strategically and stay organized when decisions are complex. I learned how to manage details, negotiate effectively, and follow through.

I also own a massage therapy practice, and that experience shaped a completely different side of how I work. It taught me how to build trust quickly, how to listen closely, and how to communicate clearly when someone is overwhelmed or unsure of what they need.

That combination is rare. Strategy and structure on one side, and real human connection on the other. But that's exactly what clients need when they're making one of the biggest financial decisions of their lives.

Real Estate Investing + Staging Experience

I've been investing in real estate for years, and that gives me a different perspective than many traditional agents. I understand value, risk, and exit strategy. I know how investors think, and I know what makes a deal work.

I'm also a professional home stager with Style & Staging, based in Scottsdale, and I've seen firsthand how much presentation impacts a sale. Staging isn't about decorating. It's marketing strategy that sells. It shapes photography, showings, and the emotional response buyers have the moment they walk through the door.

When you combine investing knowledge with staging strategy, you get something powerful. You get a Realtor who understands both numbers and buyer psychology.

What It's Like to Work With Me

I'm direct, calm, and communicative. I don't disappear, and I don't leave clients guessing. You'll always know what's happening, what the options are, and what I recommend.

I'll give you honest feedback. I'll tell you what I would do if it were my own money or my own home. And I'll help you make decisions based on facts, not pressure.

Whether you're buying a home in Phoenix, selling a property, or trying to make an investment decision, you deserve a Realtor who treats the process like it matters.

Because it does.

Areas I Serve

I work with clients across the Phoenix Valley, from Central Phoenix to the East Valley, including:

Arcadia • Midtown Phoenix • Downtown Phoenix • Uptown Phoenix • South Phoenix • Sunnyslope • Ahwatukee • Paradise Valley • Scottsdale • Tempe • Mesa • Chandler • Gilbert • Apache Junction

If you're not sure whether I cover your area, reach out. Chances are, I do.`;

  const philosophyTitle = content?.about?.philosophyTitle || "My Commitment to You";
  const philosophyText = content?.about?.philosophyText || "You'll get honest advice, quick communication, and a real plan. I'll tell you what I'd do if it were my own home, and I'll be in your corner the entire way.";
  const lifestyleTitle = content?.about?.lifestyleTitle || 'Not sure where to start in Phoenix?';
  const lifestyleText = content?.about?.lifestyleText || 'I\'ll help you narrow down Phoenix neighborhoods based on lifestyle, commute, and what matters most to you.';

  // Split bio into paragraphs
  const bioParagraphs = fullBio.split('\n\n').filter((p: string) => p.trim());

  return (
    <div className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-[#333333] mb-6 font-serif">{pageTitle}</h1>
          <p className="text-xl text-[#555555] max-w-2xl mx-auto">
            {pageSubtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Bio Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {loading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            ) : (
              <div className="space-y-4 text-[#555555] leading-relaxed">
                {bioParagraphs.map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}

            <div className="bg-[#E76F51]/10 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-[#333333] mb-3">{philosophyTitle}</h3>
              <p className="text-[#555555]">
                {philosophyText}
              </p>
            </div>
          </motion.div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-[#E76F51]/20 to-[#2A9D8F]/20 p-8 rounded-2xl">
              <img
                src={content?.about?.profileImage || "/profile.jpg"}
                alt={content?.about?.profileName || "Lara Chapman, Realtor"}
                className="w-full max-w-md mx-auto rounded-2xl shadow-xl"
              />
            </div>
            <div className="mt-8 space-y-2">
              <h3 className="text-2xl font-bold text-[#333333]">
                {content?.about?.profileName || 'Lara Chapman'}
              </h3>
              <p className="text-[#E76F51] font-semibold">
                {content?.about?.profileTitle || 'Realtor® | Investor | Home Stager'}
              </p>
              <p className="text-[#555555]">
                {content?.about?.profileCompany || 'Bliss Realty'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Lifestyle Photo Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
              src={content?.about?.lifestyleImage || "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200"}
              alt="Phoenix Valley Lifestyle"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 flex items-center justify-center">
              <div className="text-center text-white max-w-2xl mx-auto px-6">
                <h3 className="text-3xl font-bold mb-4 font-serif">{lifestyleTitle}</h3>
                <p className="text-xl">
                  {lifestyleText}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About