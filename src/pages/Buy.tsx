
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Eye, FileText, Key, Home, DollarSign, Camera, TrendingUp, CheckCircle, Star, Award, Target, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import MortgageCalculator from '../components/MortgageCalculator';
import { usePageContent } from '../hooks/usePageContent';

// Icon mapping for dynamic content
const iconMap: { [key: string]: any } = {
  FileText, Search, Eye, Key, Home, DollarSign, Camera, TrendingUp, CheckCircle, Star, Award, Target
};

const SearchBar = () => {
  const { content } = usePageContent();

  const buttonText = content?.buy?.searchButtonText || 'SEARCH HOMES IN PHOENIX';
  const buttonUrl = content?.buy?.searchButtonUrl || 'https://search.blissrealtyinvestment.com/idx/search/advanced?agentHeaderID=15891149';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="flex justify-center mb-16"
    >
      <a
        href={buttonUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-[#E76F51] text-white px-12 py-4 rounded-xl font-semibold uppercase tracking-wide hover:bg-[#E76F51]/90 transition-all duration-200 hover:scale-105 shadow-lg"
      >
        {buttonText}
      </a>
    </motion.div>
  )
}

// Default steps for fallback
const defaultSteps = [
  { icon: 'FileText', title: 'First Step: The Buyer Consultation and Onboarding Session', text: 'We start with a Buyer Strategy Meeting where we talk through your goals and timeline. I\'ll walk you through the Arizona buying process, explain how I work, and go over the benefits of my VIP Buyer Program. Once you\'re ready, we\'ll handle the initial paperwork and start your home search with a clear plan.' },
  { icon: 'Search', title: 'MLS Home Search Setup', text: 'I build a custom MLS search based on your criteria and send listings as soon as they hit the market, so you\'re seeing the best options in real time.' },
  { icon: 'Eye', title: 'Guided Property Showings', text: 'We tour homes with a critical eye. I\'ll point out pros, red flags, resale factors, and what\'s most important in today\'s Phoenix market.' },
  { icon: 'FileText', title: 'Strategic Negotiation', text: 'When it\'s time to write an offer, we\'ll review your options and how price, terms, and contingencies affect your position. You\'ll have my insight before deciding how to move forward, and the offer will reflect your priorities.' },
  { icon: 'Key', title: 'Transaction Management', text: 'From inspections to appraisal to repairs, I coordinate the details and keep everything moving so you don\'t get blindsided by surprises.' },
  { icon: 'Key', title: 'Closing Day + VIP Buyer Program', text: 'I\'ll guide you through closing day with clear communication and no surprises. I coordinate with my trusted local team to keep everything on track. After closing, you\'re in my VIP Buyer Program for life.' }
];

const BuyerSteps = () => {
  const { content, loading } = usePageContent();

  // Use API data if available, otherwise fall back to defaults
  const steps = content?.buy?.steps && content.buy.steps.length > 0
    ? content.buy.steps
    : defaultSteps;

  const stepsTitle = content?.buy?.stepsTitle || 'My Home Buying Process, Step by Step';
  const stepsSubtitle = content?.buy?.stepsSubtitle || 'Helping buyers across the Greater Phoenix Area, from Central Phoenix to the East Valley. I\'ll guide you through each step, from the first showing to closing day, so you can buy with a clear plan and no surprises.';

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24 px-6 bg-[#FAF9F6]"
    >
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-[#333333] mb-6 font-serif">{stepsTitle}</h2>
        <p className="text-xl text-[#555555] max-w-3xl mx-auto text-center leading-relaxed">{stepsSubtitle}</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {loading ? (
          // Loading skeleton
          [...Array(6)].map((_, index) => (
            <div key={index} className="flex items-start space-x-6 animate-pulse">
              <div className="flex-shrink-0 bg-gray-300 w-12 h-12 rounded-full"></div>
              <div className="flex-1 bg-white p-6 rounded-2xl shadow-md">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ))
        ) : (
          steps.map((step, index) => {
            const IconComponent = iconMap[step.icon] || FileText;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-6"
              >
                <div className="flex-shrink-0 bg-[#E76F51] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md flex-1 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#E76F51]/10 p-3 rounded-xl">
                      <IconComponent size={24} className="text-[#E76F51]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#333333] mb-2">{step.title}</h3>
                      <p className="text-[#555555] leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.section>
  )
}


const CommitmentSection = () => {
  const { content } = usePageContent();

  const title = content?.buy?.commitmentTitle || 'My Commitment To You';
  const commitments = content?.buy?.commitmentPoints && content.buy.commitmentPoints.length > 0
    ? content.buy.commitmentPoints
    : [
      'Proactive updates so you\'re never left wondering what\'s next',
      'Phoenix market insight from a native Phoenician, not Zillow guesses or outdated info',
      'Honest guidance so you can make confident decisions without feeling pressured',
      'Smart negotiation strategy that protects your interests and strengthens your offer',
      'A trusted local team of professionals to support you before closing and long after you move in'
    ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-16"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#E76F51]/5 border border-[#E76F51]/20 p-12 rounded-2xl">
          <h2 className="text-4xl font-bold text-[#333333] mb-8 font-serif text-center">{title}</h2>
          <ul className="space-y-4">
            {commitments.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <CheckCircle size={22} className="text-[#E76F51] flex-shrink-0 mt-1" />
                <span className="text-lg text-[#555555] leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  )
}

const ReadyToStartCTA = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-16"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-[#333333] mb-4 font-serif">Ready to Get Started?</h2>
        <p className="text-xl text-[#555555] mb-8">Set up a quick call to talk through your goals and next steps. No pressure.</p>
        <Link
          to="/contact"
          className="inline-block bg-[#E76F51] text-white px-12 py-4 rounded-xl font-semibold uppercase tracking-wide hover:bg-[#E76F51]/90 transition-all duration-200 hover:scale-105 shadow-lg"
        >
          Schedule a Buyer Strategy Meeting
        </Link>
      </div>
    </motion.section>
  )
}

const FAQSection = () => {
  const { content } = usePageContent();
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqTitle = content?.buy?.faqTitle || 'Frequently Asked Questions';

  const defaultFaqs = [
    {
      question: "What's the first step to buying a home in the Phoenix area?",
      answer: "The first step is a Buyer Strategy Meeting. We'll sit down and talk through your goals, timeline, and what you're looking for, and I'll walk you through the Arizona home buying process step by step. I'll also explain exactly how I work, what you can expect from me, and how we'll communicate along the way, so everything feels clear from the start. From there, we'll take the next steps in the right order, so your search stays focused and you feel prepared the whole way through."
    },
    {
      question: "Do I need to be pre-approved before looking at homes?",
      answer: "Yes, a pre-approval is an important early step. It helps you understand your budget, strengthens your position when it's time to make an offer, and prevents surprises later in the process. I will connect you with my trusted team of local lenders who are knowledgeable, professional, and genuinely easy to talk to. They've helped many of my clients, I've even sent my kids to them, and they'll walk you through your options carefully, so you feel informed and supported from the start."
    },
    {
      question: "How much money do I need to buy a home in Arizona?",
      answer: "It depends on your loan type, down payment, and closing costs. Many buyers can purchase with around 3% down, and sometimes even less depending on the loan program. This is one of the first things my trusted lending team will help you evaluate so you know what you qualify for and what feels comfortable. Once we have those numbers, we'll use that information to narrow down your home search and make sure you're shopping with a clear plan."
    },
    {
      question: "How competitive is the Phoenix housing market right now?",
      answer: "It depends on the neighborhood, price point, and time of year. Some areas move quickly, while others offer more room to negotiate. I'll help you understand what's happening in the specific areas you're considering so you know when to move quickly and when to take your time. You can also check my latest Phoenix market reports and neighborhood data on this site, including trends like average days on market and recent closing prices."
    },
    {
      question: "Can I negotiate price or closing costs as a buyer?",
      answer: "Yes. Negotiation is more than just price. Depending on the home and the market, we may negotiate closing costs, repairs, timelines, or other terms. I'll explain your options clearly, share my insight, and then help you move forward in the way that feels right for you."
    },
    {
      question: "How long does it take to buy a home in Phoenix?",
      answer: "Most home purchases take about 30–45 days from contract to closing, depending on financing, appraisal timing, and inspections. I'll outline the timeline early so you know what to expect and can plan with confidence."
    },
    {
      question: "Can you help if I'm relocating to Phoenix?",
      answer: "Yes. I love working with relocation clients because Phoenix is a big, spread-out market, and each area feels different. I'll help you compare neighborhoods based on commute, lifestyle, and what your budget realistically gets you in different parts of the Valley. If you're buying from out of state, I can also do video walkthroughs and give you honest feedback, so you feel confident in your decision before you make a move."
    }
  ];

  const faqs = content?.buy?.faqs && content.buy.faqs.length > 0 ? content.buy.faqs : defaultFaqs;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-[#333333] mb-12 font-serif text-center">{faqTitle}</h2>
        <div className="space-y-4">
          {faqs.map((faq, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-[#333333] pr-4">
                  {index + 1}. {faq.question}
                </span>
                <span className={`text-[#E76F51] transform transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-6 text-[#555555] leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-[#555555] mb-4">Have more questions?</p>
          <p className="text-[#555555] mb-6">Visit my full Phoenix Home Buying FAQ page for more answers, loan options, and buyer tips.</p>
          <Link
            to="/faq"
            className="inline-block bg-[#2A9D8F] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#2A9D8F]/90 transition-colors"
          >
            View More Phoenix Market FAQs
          </Link>
        </div>
      </div>
    </motion.section>
  )
}

const NeighborhoodExploration = () => {
  const { content } = usePageContent();

  const title = content?.buy?.neighborhoodTitle || 'Neighborhood Guides from Central Phoenix to the East Valley';
  const rawText = content?.buy?.neighborhoodText || 'The Phoenix Valley offers diverse neighborhoods, each with its own energy and benefits. The right fit depends on your lifestyle and priorities.\n\nBegin exploring our Valley with these area guides.\nMidtown Phoenix • Arcadia & Biltmore • Encanto Village • Uptown Phoenix • Paradise Valley • North Scottsdale • North Tempe & South Scottsdale • Gilbert • Mesa • South Tempe, Chandler & Ahwatukee';
  const buttonText = content?.buy?.neighborhoodButtonText || 'Explore Neighborhood Guides';
  const buttonUrl = content?.buy?.neighborhoodButtonUrl || '/neighborhoods';

  // Split text by lines to handle the bulleted list differently
  const lines = rawText.split('\n');
  const bulletsIndex = lines.findIndex(line => line.includes('•'));

  const introLines = bulletsIndex !== -1 ? lines.slice(0, bulletsIndex) : lines;
  const bulletLines = bulletsIndex !== -1 ? lines.slice(bulletsIndex) : [];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-16"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl group">
          <div
            className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: "url('https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920')",
            }}
          />
          <div className="absolute inset-0 bg-black/60 z-10" />

          <div className="relative z-20 p-12 md:p-20 text-center">
            <div className="flex justify-center mb-8">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                <MapPin className="text-white" size={24} />
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 font-serif leading-tight max-w-4xl mx-auto">{title}</h2>

            <div className="space-y-6 mb-12 max-w-3xl mx-auto">
              {introLines.map((line, i) => (
                <p key={i} className={`text-xl text-white/90 leading-relaxed ${line.trim() === '' ? 'h-0' : ''}`}>
                  {line}
                </p>
              ))}
            </div>

            {bulletLines.length > 0 && (
              <div className="mb-14">
                {bulletLines.map((line, i) => (
                  <p key={i} className="text-xl md:text-2xl font-bold text-white leading-relaxed max-w-5xl mx-auto">
                    {line}
                  </p>
                ))}
              </div>
            )}

            <Link
              to={buttonUrl}
              className="inline-block bg-[#E76F51] text-white px-12 py-5 rounded-xl font-semibold hover:bg-[#E76F51]/90 transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

const ResourcesSection = () => {
  const { content } = usePageContent();

  const handleDownload = (fileName: string) => {
    const link = document.createElement('a')
    link.href = `/${fileName}`
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const resourcesTitle = content?.buy?.resourcesTitle || 'Phoenix Home Buying Resources';
  const resourcesSubtitle = content?.buy?.resourcesSubtitle || 'Use these free tools to estimate payments, download my Phoenix home buying guide, and track local market trends.';

  const resources = content?.buy?.resources && content.buy.resources.length > 0 ? content.buy.resources : [
    {
      icon: 'FileText',
      title: 'Phoenix Home Buying Guide\n(Free Download)',
      description: 'Download my comprehensive guide to buying your home in the Phoenix Valley.',
      buttonText: 'Download Guide',
      buttonUrl: '/buyers guide.pdf',
      isExternal: false,
      isDownload: true
    },
    {
      icon: 'FileText',
      title: 'Market Reports',
      description: 'Stay informed with the latest Phoenix Valley market data.',
      buttonText: 'View Reports',
      buttonUrl: '/neighborhoods',
      isExternal: false,
      isDownload: false
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24 bg-[#FAF9F6]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#333333] mb-6 font-serif">{resourcesTitle}</h2>
          <p className="text-xl text-[#555555] max-w-2xl mx-auto">
            {resourcesSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Mortgage Calculator Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <MortgageCalculator />
          </motion.div>

          {/* Other Resource Cards */}
          {resources.map((resource, index) => {
            const IconComponent = iconMap[resource.icon] || Home;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 text-center flex flex-col"
              >
                <div className="bg-[#2A9D8F]/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <IconComponent size={28} className="text-[#2A9D8F]" />
                </div>
                <h3 className="text-2xl font-bold text-[#333333] mb-4">
                  {resource.title.includes('(Free Download)') ? (
                    <>
                      {resource.title.replace('(Free Download)', '').trim()}
                      <span className="block text-lg font-medium text-[#E76F51] mt-1">
                        (Free Download)
                      </span>
                    </>
                  ) : resource.title.includes('\n') ? (
                    <>
                      {resource.title.split('\n')[0]}
                      <span className="block text-lg font-medium text-[#E76F51] mt-1">
                        {resource.title.split('\n')[1]}
                      </span>
                    </>
                  ) : (
                    resource.title
                  )}
                </h3>
                <p className="text-[#555555] mb-6 flex-grow">{resource.description}</p>
                {resource.isDownload ? (
                  <button
                    onClick={() => handleDownload(resource.buttonUrl.replace('/', ''))}
                    className="inline-block bg-[#2A9D8F] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2A9D8F]/90 transition-colors mt-auto"
                  >
                    {resource.buttonText}
                  </button>
                ) : resource.isExternal ? (
                  <a
                    href={resource.buttonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#2A9D8F] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2A9D8F]/90 transition-colors mt-auto"
                  >
                    {resource.buttonText}
                  </a>
                ) : (
                  <Link
                    to={resource.buttonUrl}
                    className="inline-block bg-[#2A9D8F] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2A9D8F]/90 transition-colors mt-auto"
                  >
                    {resource.buttonText}
                  </Link>
                )}
              </motion.div>
            )
          })}
        </div>


      </div>
    </motion.section>
  )
}

const Buy = () => {
  const { content } = usePageContent();

  // Get dynamic content with fallbacks
  const introTitle = content?.buy?.introTitle || 'Buying a Home in the Phoenix Valley';
  const introText = content?.buy?.introText || 'Real-time Phoenix Valley MLS listings, updated every 15 minutes.\nLocal guidance when you\'re ready to tour and make an offer.';


  return (
    <div className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-[#333333] mb-6 font-serif">{introTitle}</h1>
          <p className="text-xl text-[#555555] max-w-3xl mx-auto whitespace-pre-line">
            {introText}
          </p>
        </motion.div>

        <SearchBar />



        <BuyerSteps />
        <CommitmentSection />
        <ReadyToStartCTA />
        <FAQSection />
        <NeighborhoodExploration />
        <ResourcesSection />
      </div>
    </div>
  )
}

export default Buy