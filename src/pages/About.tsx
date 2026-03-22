import React from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { usePageContent } from '../hooks/usePageContent'

const About = () => {
  const { content, loading } = usePageContent();

  const profileImage = content?.about?.profileImage || '/profile.jpg';
  const profileName = content?.about?.profileName || 'Lara Chapman';

  // Full bio content matching the approved format
  const fullBio = content?.about?.fullBio ||
    `I'm Lara Chapman, a Phoenix Valley REALTOR® and native Phoenician serving clients from Central Phoenix to the East Valley. I've lived here my whole life, and I genuinely love this market. Not just because Phoenix is growing, but because real estate here creates real opportunities. For families, for first-time buyers, and for people trying to build long-term wealth.

If you're relocating to Arizona, buying your first home, or investing in Phoenix real estate, my goal is simple. I want you to feel informed, supported, and confident in your decision.

### Why Clients Work With Me

Real estate is rarely just a transaction. It's usually tied to a bigger life moment. A move, a new job, a new chapter, a divorce, a growing family, a parent downsizing, or a financial goal that matters.

My clients don't come to me because they want a pushy salesperson. They come to me because they want a Realtor who listens, communicates clearly, and knows how to guide them when the decision feels big.

That's the type of professional I've always been.

### My Background (And Why It Matters in Real Estate)

Before I became a REALTOR®, I worked in finance and operations leadership, which trained me to think strategically and stay organized when decisions are complex. I learned how to manage details, negotiate effectively, and follow through.

I also own a massage therapy practice, and that experience shaped a completely different side of how I work. It taught me how to build trust quickly, how to listen closely, and how to communicate clearly when someone is overwhelmed or unsure of what they need.

That combination is rare. Strategy and structure on one side, and real human connection on the other. But that's exactly what clients need when they're making one of the biggest financial decisions of their lives.

### Real Estate Investing + Staging Experience

I've been investing in real estate for years, and that gives me a different perspective than many traditional agents. I understand value, risk, and exit strategy. I know how investors think, and I know what makes a deal work.

I'm also a professional home stager, and I've seen firsthand how much presentation impacts a sale. Staging isn't about decorating. It's marketing strategy that sells. It impacts photography, showings, and the emotional response buyers have the moment they walk through the door.

When you combine investing knowledge with staging strategy, you get something powerful. You get a Realtor who understands both numbers and buyer psychology.

### What It's Like to Work With Me

I'm direct, calm, and communicative. I don't disappear, and I don't leave clients guessing. You'll always know what's happening, what the options are, and what I recommend.

I'll give you honest feedback. I'll tell you what I would do if it were my own money or my own home. And I'll help you make decisions based on facts, not pressure.

Whether you're buying a home in Phoenix, selling a property, or trying to make an investment decision, you deserve a Realtor who treats the process like it matters.

Because it does.`;



  // Normalize escaped \n sequences that may come from the API (PowerShell stores literal \n)
  const normalizedBio = fullBio.replace(/\\n/g, '\n');

  // Parse bio into blocks: headings (###) and paragraphs, handling possible CRLF endings
  const bioParagraphs = normalizedBio.split(/\n\s*\n/).map((p: string) => p.trim()).filter(Boolean);

  return (
    <div className="py-24 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-[#333333] mb-4 font-serif">
            About Lara Chapman | Phoenix Valley REALTOR®
          </h1>
        </motion.div>

        {/* Two-column: Bio + Photo */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-16 items-start">

          {/* Bio Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {loading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            ) : (
              <div className="space-y-5 text-[#555555] text-[1.0625rem] leading-[1.8]">
                {bioParagraphs.map((paragraph: string, index: number) => {
                  if (paragraph.startsWith('###')) {
                    return (
                      <h2
                        key={index}
                        className="text-xl font-bold text-[#222222] mt-10 mb-1 font-sans"
                      >
                        {paragraph.replace('###', '').trim()}
                      </h2>
                    );
                  }
                  return (
                    <p key={index}>
                      {paragraph.split('\n').map((line, i, arr) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < arr.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center lg:sticky lg:top-28"
          >
            <div className="bg-gradient-to-br from-[#1b6884]/10 to-[#E76F51]/10 p-4 rounded-3xl shadow-inner w-full">
              <img
                src={profileImage}
                alt={profileName}
                className="w-full rounded-2xl shadow-2xl object-cover"
              />
            </div>
            <div className="mt-8 text-center space-y-2">
              <h3 className="text-2xl font-bold text-[#333333] font-serif">{profileName}</h3>
              <div className="flex flex-wrap justify-center gap-2 text-[#E76F51] font-bold text-sm uppercase tracking-wider">
                <span>Realtor®</span>
                <span className="text-gray-300">|</span>
                <span>Investor</span>
                <span className="text-gray-300">|</span>
                <span>Home Stager</span>
              </div>
              <p className="text-[#555555] text-sm font-medium uppercase tracking-widest">
                {content?.about?.profileCompany || 'Bliss Realty'}
              </p>
            </div>
          </motion.div>
        </div> {/* End of grid */}
      </div> {/* End of max-w-5xl */}

      {/* Areas I Serve Section - Scaled down for a more balanced look */}
      <div className="mt-24 w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-5xl mx-auto overflow-hidden rounded-[2.5rem] relative shadow-2xl group"
        >
          <div
            className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-[4000ms] group-hover:scale-105"
            style={{
              backgroundImage: "url('https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920')",
              backgroundPosition: 'center 60%'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/85 z-10" />

          <div className="relative z-20 py-20 px-8 md:px-16 flex flex-col items-center text-center text-white">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center mb-6 border border-white/20">
              <MapPin className="text-[#E76F51]" size={24} />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif tracking-tight drop-shadow-xl">
              Areas I Serve
            </h2>

            <p className="text-[#E76F51] font-bold text-xs uppercase tracking-[0.4em] mb-10 drop-shadow-md opacity-90">
              Central Phoenix to the East Valley
            </p>

            <div className="max-w-4xl w-full">
              <p className="text-white/90 text-lg mb-10 leading-relaxed text-center">
                Serving clients across the Phoenix Valley,<br />
                from Central Phoenix to the East Valley, including:
              </p>

              <div className="flex flex-col items-center gap-y-3 mb-16 text-base md:text-lg font-bold tracking-tight text-white/95 w-full">
                {/* Row 1 */}
                <div className="flex items-center gap-x-4 justify-center whitespace-nowrap">
                  <span>Arcadia &amp; Biltmore</span>
                  <span className="text-[#E76F51] opacity-60">•</span>
                  <span>Encanto Village</span>
                  <span className="text-[#E76F51] opacity-60">•</span>
                  <span>Uptown Phoenix</span>
                  <span className="text-[#E76F51] opacity-60">•</span>
                  <span>Paradise Valley</span>
                </div>
                {/* Row 2 */}
                <div className="flex items-center gap-x-4 justify-center whitespace-nowrap">
                  <span>North Scottsdale</span>
                  <span className="text-[#E76F51] opacity-60">•</span>
                  <span>North Tempe &amp; South Scottsdale</span>
                  <span className="text-[#E76F51] opacity-60">•</span>
                  <span>Gilbert</span>
                  <span className="text-[#E76F51] opacity-60">•</span>
                  <span>Mesa</span>
                </div>
                {/* Row 3 */}
                <div className="flex items-center gap-x-4 justify-center whitespace-nowrap">
                  <span>South Tempe, Chandler &amp; Ahwatukee</span>
                </div>
              </div>

              <div className="pt-12 border-t border-white/10 flex flex-col items-center">
                <p className="text-white/40 uppercase text-[9px] md:text-[10px] tracking-[0.3em] mb-4 font-semibold uppercase">
                  Not sure? Reach out: If you're not sure whether I cover your area
                </p>
                <p className="text-2xl md:text-4xl font-serif text-white tracking-tight">
                  Reach out. <span className="italic text-[#E76F51]">Chances are, I do.</span>
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