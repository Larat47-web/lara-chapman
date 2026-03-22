import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { DollarSign, Camera, TrendingUp, FileText, Key, CheckCircle, ChevronDown, ChevronUp, Search, Eye, Home, Star, Award, Target } from 'lucide-react'
import { usePageContent } from '../hooks/usePageContent';

// Icon mapping for dynamic content
const iconMap: { [key: string]: any } = {
  FileText, Search, Eye, Key, Home, DollarSign, Camera, TrendingUp, CheckCircle, Star, Award, Target
};

// Default seller steps for fallback
const defaultSellerSteps = [
  { icon: 'DollarSign', title: 'Pricing Strategy That Matches the Phoenix Market', text: 'I analyze recent sales, current buyer demand, and your neighborhood comp, current Phoenix Valley market trends, and local behavior so it attracts offers instead of sitting.' },
  { icon: 'Camera', title: 'Professional Staging & Presentation', text: 'I\'m a certified home stager through Style & Staging. I know what creates the "this is the one" feeling. Style & Staging produces your home so it looks best in photos and in person.' },
  { icon: 'TrendingUp', title: 'Marketing That Creates Visibility', text: 'Your home is marketed online and on the MLS, with professional photography, targeted media, and targeted outreach to attract Phoenix Market Buyers, relocation clients, and out-of-state interest. When the marketing is right, showings follow quickly.' },
  { icon: 'FileText', title: 'Negotiation To Protect Your Bottom Line', text: 'I negotiate more than price. I focus on repairs, timeline, contingencies, and terms so you stay in control of the deal.' },
  { icon: 'CheckCircle', title: 'Strong Contract-to-Close Management', text: 'Once you\'re under contract, I stay on top of every moving part, including inspections, appraisal, title, and deadlines, so the deal doesn\'t drift.' },
  { icon: 'Key', title: 'A Smooth Closing Process', text: 'You\'ll know what to expect, what\'s next, and how to stay prepared all the way to closing day. I coordinate with my trusted local professionals as the details stay on track.' }
];

const Sell = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const { content, loading } = usePageContent();

  // Use API data if available, otherwise fall back to defaults
  const sellerSteps = content?.sell?.marketingPoints && content.sell.marketingPoints.length > 0
    ? content.sell.marketingPoints
    : defaultSellerSteps;

  const stagingGallery = content?.sell?.stagingGallery && content.sell.stagingGallery.length > 0 ? content.sell.stagingGallery : [
    {
      image: 'https://images.pexels.com/photos/2029695/pexels-photo-2029695.jpeg?auto=compress&cs=tinysrgb&w=800',
      room: 'Modern Kitchen',
      description: 'Bright, white cabinetry, lights, and functional layout that feels clean and inviting. Built for family life or resale.'
    },
    {
      image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
      room: 'Spacious Living Room',
      description: 'A clean, welcoming layout that lets buyers see themselves living here, not a magazine spread.'
    },
    {
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
      room: 'Master Bedroom',
      description: 'A light, neutral space. Buyers focus on layout, light, and how it feels, not furniture.'
    },
    {
      image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800',
      room: 'Outdoor Living',
      description: 'Outdoor spaces matter in Phoenix. A clean patio or yard setup helps buyers imagine entertaining, relaxing, or just living here.'
    },
  ];

  const faqs = content?.sell?.faqs && content.sell.faqs.length > 0 ? content.sell.faqs : [
    {
      question: 'How do you determine the right listing price for my home in the Phoenix area?',
      answer: 'Pricing a home correctly is part math and part strategy. I look at recent comparable sales, current active competition, buyer demand, and neighborhood trends. Then I factor in condition, upgrades, layout, and presentation. The goal isn\'t just to pick a number. It\'s to position your home so it attracts serious buyers and creates leverage during negotiations.'
    },
    {
      question: 'Do you offer home staging services across the Phoenix Valley?',
      answer: 'Yes. I\'m also a professional home stager, and I work hand-in-hand with Style & Staging, a Phoenix-based vacant home staging company that services the entire Greater Phoenix area. Sometimes staging means full furniture and design. Other times it means a targeted plan using what you already have. Either way, the goal is the same: make your home photograph beautifully and show like something buyers want to compete for.'
    },
    {
      question: 'Do you recommend staging before listing to sell my home?',
      answer: 'Yes, absolutely. Staging isn\'t decorating. It\'s marketing. It shapes the way buyers experience the home online and in person, and it often makes the difference between "this is nice" and "this is the one." This is especially true in competitive areas like Scottsdale, Arcadia, and Chandler, and in historic districts like Encanto Village, Roosevelt Row, and Willo in Phoenix, or Downtown Mesa, where unique layouts and older floor plans can confuse modern buyers. Staging helps buyers visualize how the home actually lives, not just what it looks like.'
    },
    {
      question: 'How long does it typically take to sell a home in the Valley of the Sun?',
      answer: 'It depends on your location, price point, and how the home is positioned. Some homes sell quickly if they\'re priced correctly and show well from day one. Others sit because the strategy isn\'t aligned with what today\'s buyers expect. My job is to launch your listing with strong pricing, strong presentation, and a clear plan so you\'re not stuck waiting and wondering.'
    },
    {
      question: 'Should I make repairs or updates before listing?',
      answer: 'Sometimes yes, but not always. I\'ll walk through your home with a seller\'s eye and tell you what\'s worth doing and what\'s a waste of money. In many cases, small fixes, paint touch-ups, and presentation changes can have a bigger impact than expensive renovations. If you want to sell efficiently, we focus on the upgrades buyers actually notice.'
    },
    {
      question: 'What\'s the common REALTOR® commission in Phoenix?',
      answer: 'Commission structures vary, and there\'s no one-size-fits-all answer. I\'m transparent about how I work and what my services include. Let\'s talk through your goals, your home, and your timeline, and I\'ll walk you through the full breakdown so you know exactly what to expect.'
    },
    {
      question: 'What happens if my home doesn\'t sell?',
      answer: 'If your home isn\'t selling, it usually comes down to one of three things: price, presentation, or positioning. We\'ll reassess the strategy, adjust what needs to change, and relaunch with a stronger plan. I don\'t let listings sit and go stale. If something isn\'t working, we fix it.'
    },
    {
      question: 'How do you market homes beyond the MLS?',
      answer: 'The MLS is only the starting point. I market homes across major real estate platforms, social media, and direct outreach. That includes online exposure and real-world visibility. The goal is to get your home in front of qualified buyers fast, especially in high-demand areas across Central Phoenix and the East Valley.'
    },
    {
      question: 'What areas do you serve in the Phoenix Metro?',
      answer: 'I work across the Phoenix Valley, including Arcadia, Midtown Phoenix, Downtown Phoenix, Uptown Phoenix, South Phoenix, Sunnyslope, Ahwatukee, Paradise Valley, Scottsdale, Tempe, Mesa, Chandler, Gilbert, and Apache Junction. If you\'re not sure if I cover your neighborhood, just reach out.'
    },
    {
      question: 'Can you sell my home if it is vacant?',
      answer: 'Yes, and this is where staging becomes even more important. Vacant homes often feel colder in photos and harder for buyers to visualize. That\'s why I partner with Style & Staging, the best Phoenix Valley vacant home staging team that specializes in making empty homes feel high-end, warm, and memorable.'
    },
    {
      question: 'What makes your selling strategy different?',
      answer: 'I don\'t just list homes and wait. I position them. That means pricing with purpose, staging for impact, and marketing with intention. I also stay involved through the entire process, from the first consultation to closing day, so nothing falls through the cracks.'
    },
    {
      question: 'Do you offer a free home value estimate?',
      answer: 'Yes. I provide a detailed home value estimate based on current market data, recent sales, and your home\'s specific features. It\'s free, no-obligation, and gives you a clear starting point for planning your sale.'
    },
    {
      question: 'What happens if the buyer backs out?',
      answer: 'No need to panic. Buyers do cancel occasionally, and I\'ll be right by your side to make sure the contract is handled correctly and your interests are protected. The important thing is not to take it personally. Many cancellations happen during the inspection period, and it can be due to the property, financing, or something specific to that buyer. If a buyer walks away outside of their contingency timelines, earnest money may be at risk. Either way, I\'ll explain exactly where you stand and help you move forward quickly so your home doesn\'t lose momentum.'
    },
    {
      question: 'Should I accept the first offer?',
      answer: 'Sometimes the first offer is the right one, especially if it\'s clean and the buyer is well-qualified. But I look at more than price. I review financing strength, contingencies, timelines, and how likely the deal is to actually close. My job is to walk you through the details so you can choose the offer that truly makes the most sense, not just the one that looks best on paper.'
    }
  ];

  const resources = content?.sell?.resources && content.sell.resources.length > 0 ? content.sell.resources : [
    {
      icon: 'FileText',
      title: 'Phoenix Home Selling Guide',
      description: 'A practical Phoenix home selling guide that explains how to price, prepare, and sell your home in today\'s Phoenix real estate market.',
      buttonText: 'Download the Phoenix Home Selling Guide',
      buttonUrl: '/sellers guide.pdf',
      isExternal: false,
      isDownload: true
    },
    {
      icon: 'DollarSign',
      title: 'What is Your Home Worth?',
      description: 'Get a quick home estimate based on recent local sales and current Phoenix market activity.',
      buttonText: 'Get Estimate',
      buttonUrl: 'https://www.highway.ai/app/homereport/register/dTfLtaKXS3?creationSource=signup_link',
      isExternal: true,
      isDownload: false
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  // Get dynamic content with fallbacks
  const introTitle = content?.sell?.introTitle || 'Sell Your Home in Phoenix with Lara Chapman';
  const introText = content?.sell?.introText || 'Smart pricing, strong marketing, and professional staging that gets buyers through the door';
  const stepsTitle = content?.sell?.stepsTitle || 'My Selling Strategy';
  const stepsSubtitle = content?.sell?.stepsSubtitle || 'I guide you through every step of the selling process to maximize your home\'s value and minimize stress.';
  const stagingTitle = content?.sell?.stagingTitle || 'Staging Examples';
  const stagingSubtitle = content?.sell?.stagingSubtitle || 'See how home staging changes how buyers see your home, and how fast it sells.';
  const stagingCta = content?.sell?.stagingCta || 'In the Phoenix market, first impressions happen fast. Professional home staging helps buyers connect emotionally, and that connection creates the "this is the one" feeling. Style & Staging produces your home so it looks best in photos and in person. Staging services are available through Style & Staging, one of the Valley\'s top-rated home staging teams for residential listings.';
  const stagingButtonText = content?.sell?.stagingButtonText || 'Explore Style & Staging';
  const stagingButtonUrl = content?.sell?.stagingButtonUrl || 'https://styleandstaging.com';
  const resourcesTitle = content?.sell?.resourcesTitle || 'Helpful Resources';
  const resourcesSubtitle = content?.sell?.resourcesSubtitle || 'Download free guides and tools to help you prepare for selling your home.';
  const faqTitle = content?.sell?.faqTitle || 'Frequently Asked Questions';
  const faqSubtitle = content?.sell?.faqSubtitle || 'Straight answers to the most common questions homeowners ask before selling in the Phoenix Valley.';
  const ctaTitle = content?.sell?.ctaTitle || 'Thinking of selling?';
  const ctaText = content?.sell?.ctaText || 'Call me. I\'m happy to walk you through your options and give you a clear plan. No pressure. Just honest advice.';
  const ctaButtonText = content?.sell?.ctaButtonText || 'Request a Free Home Value Estimate Today';
  const ctaButtonUrl = content?.sell?.ctaButtonUrl || 'https://www.highway.ai/app/homereport/register/dTfLtaKXS3?creationSource=signup_link';

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

        {/* Seller Process Steps */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#333333] mb-6 font-serif">{stepsTitle}</h2>
            <p className="text-xl text-[#555555] max-w-2xl mx-auto">
              {stepsSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading skeleton
              [...Array(6)].map((_, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-md animate-pulse">
                  <div className="flex justify-between items-start mb-6">
                    <div className="bg-gray-300 w-10 h-10 rounded-full"></div>
                    <div className="bg-gray-200 w-16 h-16 rounded-xl"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              ))
            ) : (
              sellerSteps.map((step, index) => {
                const IconComponent = iconMap[step.icon] || DollarSign;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="bg-[#E76F51] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                        {index + 1}
                      </div>
                      <div className="bg-[#E76F51]/10 w-16 h-16 rounded-xl flex items-center justify-center">
                        <IconComponent size={32} className="text-[#E76F51]" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-[#333333] mb-4">{step.title}</h3>
                    <p className="text-[#555555] leading-relaxed">{step.text}</p>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.section>

        {/* Staging Gallery Section */}
        <section className="py-16 bg-[#FAF9F6]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#333333] mb-4">{stagingTitle}</h2>
              <p className="text-xl text-[#555555] max-w-3xl mx-auto">
                {stagingSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {stagingGallery.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.room}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#333333] mb-2">{item.room}</h3>
                    <p className="text-[#555555]">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-lg text-[#555555] mb-6 max-w-3xl mx-auto">
                {stagingCta}
              </p>
              <a
                href={stagingButtonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#E76F51] hover:bg-[#E76F51]/90 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                {stagingButtonText}
              </a>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-16 bg-[#FAF9F6]"
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#333333] mb-6 font-serif">{resourcesTitle}</h2>
            <p className="text-xl text-[#555555] max-w-lg mx-auto">
              {resourcesSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {resources.map((resource, index) => {
              const IconComponent = iconMap[resource.icon] || FileText;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 text-center flex flex-col"
                >
                  <div className="bg-[#E76F51]/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <IconComponent size={28} className="text-[#E76F51]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#333333] mb-4">{resource.title}</h3>
                  <p className="text-[#555555] mb-6 flex-grow">
                    {resource.description}
                  </p>
                  {resource.isDownload ? (
                    <button
                      onClick={() => {
                        const link = document.createElement('a')
                        link.href = resource.buttonUrl
                        link.download = resource.buttonUrl.replace('/', '')
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                      }}
                      className="inline-block bg-[#E76F51] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#E76F51]/90 transition-colors mt-auto"
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
                    <a
                      href={resource.buttonUrl}
                      className="inline-block bg-[#2A9D8F] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2A9D8F]/90 transition-colors mt-auto"
                    >
                      {resource.buttonText}
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#333333] mb-6 font-serif">{faqTitle}</h2>
            <p className="text-xl text-[#555555] max-w-2xl mx-auto">
              {faqSubtitle}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-[#333333] pr-4">{faq.question}</h3>
                  {openFAQ === index ? (
                    <ChevronUp size={24} className="text-[#E76F51] flex-shrink-0" />
                  ) : (
                    <ChevronDown size={24} className="text-[#E76F51] flex-shrink-0" />
                  )}
                </button>
                {openFAQ === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-8 pb-6"
                  >
                    <p className="text-[#555555] leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-[#555555] mb-4">Have more questions?</p>
            <p className="text-[#555555] mb-6">Visit my full Phoenix FAQ page for more answers, loan options, and buyer tips.</p>
            <Link
              to="/faq"
              className="inline-block bg-[#2A9D8F] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#2A9D8F]/90 transition-colors"
            >
              View More Phoenix Market FAQs
            </Link>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-[#E76F51] p-16 rounded-2xl text-white">
            <h2 className="text-4xl font-bold mb-6 font-serif">{ctaTitle}</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {ctaText}
            </p>
            <a
              href={ctaButtonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#E76F51] px-12 py-4 rounded-xl font-semibold uppercase tracking-wide hover:bg-gray-50 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              {ctaButtonText}
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default Sell