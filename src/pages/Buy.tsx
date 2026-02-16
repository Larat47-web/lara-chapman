
import { motion } from 'framer-motion'
import { Search, Eye, FileText, Key, Home, DollarSign, Camera, TrendingUp, CheckCircle, Star, Award, Target } from 'lucide-react'
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
  { icon: 'FileText', title: 'First Step: The Buyer Consultation and Onboarding Session', text: 'We start with a Buyer Strategy Meeting where we talk through your goals, timeline, and what you\'re looking for. I\'ll walk you through the Arizona buying process, explain how I work, and go over the benefits of my VIP Buyer Program. Once you\'re ready, we\'ll handle the initial paperwork and start your home search with a clear plan.' },
  { icon: 'Search', title: 'MLS Home Search Setup', text: 'I build a custom MLS search based on your criteria and send listings as soon as they hit the market, so you\'re seeing the best options in real time.' },
  { icon: 'Eye', title: 'Guided Property Showings', text: 'We tour homes with a critical eye. I\'ll point out pros, red flags, resale factors, and what matters most in today\'s Phoenix market.' },
  { icon: 'FileText', title: 'Strategic Negotiation', text: 'When it\'s time to write an offer, I\'ll explain your options and how price, terms, and contingencies affect your position. I\'ll share my insight, then we\'ll decide how you want to move forward. From there, I\'ll write the offer exactly as you\'d like.' },
  { icon: 'Key', title: 'Transaction Management', text: 'From inspections to appraisal to repairs, I coordinate the details and keep everything moving so you don\'t get blindsided by surprises.' },
  { icon: 'Key', title: 'Closing Day + VIP Buyers Program', text: 'I\'ll guide you through closing day with clear communication and no surprises. I coordinate with my trusted local team to keep everything on track. After closing, you\'re in my VIP Buyer Program for life.' }
];

const BuyerSteps = () => {
  const { content, loading } = usePageContent();

  // Use API data if available, otherwise fall back to defaults
  const steps = content?.buy?.steps && content.buy.steps.length > 0
    ? content.buy.steps
    : defaultSteps;

  const stepsTitle = content?.buy?.stepsTitle || 'Buying a Home in the Greater Phoenix Area, Step by Step';
  const stepsSubtitle = content?.buy?.stepsSubtitle || 'I\'ll guide you through each step, from the first showing to closing day, so you can buy with a clear plan and no surprises.';

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24"
    >
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-[#333333] mb-6 font-serif">{stepsTitle}</h2>
        <p className="text-xl text-[#555555] max-w-2xl mx-auto">
          {stepsSubtitle}
        </p>
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


const NeighborhoodExploration = () => {
  const { content } = usePageContent();

  // Get dynamic content with fallbacks
  const title = content?.buy?.neighborhoodTitle || 'Explore Central Phoenix and East Valley Neighborhoods';
  const text = content?.buy?.neighborhoodText || 'From historic districts to family-friendly suburbs, every part of the Phoenix Valley has its own vibe, commute, and price range. Use these neighborhood guides to find the area that fits your lifestyle. Neighborhoods featured: Arcadia / Biltmore • Encanto Village • Uptown Phoenix • Paradise Valley • North Scottsdale • North Tempe / South Scottsdale • Gilbert • Mesa • South Tempe / Chandler / Ahwatukee';
  const buttonText = content?.buy?.neighborhoodButtonText || 'Explore Neighborhood Guides';
  const buttonUrl = content?.buy?.neighborhoodButtonUrl || '/neighborhoods';

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-16"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white p-12 rounded-2xl shadow-md">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[#333333] mb-6 font-serif">{title}</h2>
            <p className="text-xl text-[#555555] mb-8 leading-relaxed">
              {text}
            </p>
            <Link
              to={buttonUrl}
              className="inline-block bg-[#2A9D8F] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#2A9D8F]/90 transition-colors"
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
  const ctaButtonText = content?.buy?.ctaButtonText || 'Browse Phoenix Valley Listings';
  const ctaButtonUrl = content?.buy?.ctaButtonUrl || 'https://search.blissrealtyinvestment.com/idx/search/advanced?agentHeaderID=15891149';

  const resources = content?.buy?.resources && content.buy.resources.length > 0 ? content.buy.resources : [
    {
      icon: 'FileText',
      title: 'Phoenix Home Buying Guide (Free Download)',
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
                <h3 className="text-2xl font-bold text-[#333333] mb-4">{resource.title}</h3>
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href={ctaButtonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#E76F51] text-white px-12 py-4 rounded-xl font-semibold uppercase tracking-wide hover:bg-[#E76F51]/90 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            {ctaButtonText}
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}

const Buy = () => {
  const { content } = usePageContent();

  // Get dynamic content with fallbacks
  const introTitle = content?.buy?.introTitle || 'Buying a Home in the Phoenix Valley';
  const introText = content?.buy?.introText || 'Real-time Phoenix Valley MLS listings, updated every 15 minutes, plus local guidance when you\'re ready to tour and make an offer.';
  const mlsDescription = content?.buy?.mlsDescription || 'You\'re searching the same MLS database Realtors® use, updated every 15 minutes with the most accurate listing details available.';

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
          <p className="text-xl text-[#555555] max-w-3xl mx-auto">
            {introText}
          </p>
        </motion.div>

        <SearchBar />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white p-8 rounded-2xl shadow-md mb-16"
        >
          <p className="text-lg text-[#555555] text-center leading-relaxed">
            {mlsDescription}
          </p>
        </motion.div>

        <BuyerSteps />
        <NeighborhoodExploration />
        <ResourcesSection />
      </div>
    </div>
  )
}

export default Buy