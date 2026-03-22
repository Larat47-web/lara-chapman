import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, Home, DollarSign, MapPin, Users } from 'lucide-react'

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<string | null>(null)

    const toggleFAQ = (id: string) => {
        setOpenIndex(openIndex === id ? null : id)
    }

    const faqData = [
        {
            category: 'Buying a Home in the Phoenix Metro Area',
            icon: <Home className="text-[#2A9D8F]" size={24} />,
            items: [
                {
                    id: 'buy-1',
                    question: 'What’s the first step to buying a home in the Phoenix area?',
                    answer: 'The first step is a Buyer Strategy Meeting. We’ll sit down and talk through your goals, timeline, and what you’re looking for, and I’ll walk you through the Arizona home buying process step by step. I’ll also explain exactly how I work, what you can expect from me, and how we’ll communicate along the way, so everything feels clear from the start. From there, we’ll take the next steps in the right order, so your search stays focused and you feel prepared the whole way through.'
                },
                {
                    id: 'buy-2',
                    question: 'Do you work with first-time home buyers?',
                    answer: 'Yes, I love working with first-time buyers and I understand how many questions come up along the way. My role is to explain the process clearly, help you feel prepared at each step, and make sure you’re never pressured into decisions before you’re ready. Buying your first home is exciting, but it can also feel overwhelming at times. Don’t worry, I’ve got your back.'
                },
                {
                    id: 'buy-3',
                    question: 'Can you help if I’m relocating to Phoenix?',
                    answer: 'Yes. I love working with relocation clients because Phoenix is a big, spread-out market, and each area feels different. I’ll help you compare neighborhoods based on commute, lifestyle, and what your budget realistically gets you in different parts of the Valley. If you’re buying from out of state, I can also do video walkthroughs and give you honest feedback, so you feel confident in your decision before you make a move.'
                },
                {
                    id: 'buy-4',
                    question: 'Do I need to be pre-approved before looking at homes?',
                    answer: 'Yes, a pre-approval is an important early step. It helps you understand your budget, strengthens your position when it’s time to make an offer, and prevents surprises later in the process. I will connect you with my trusted team of local lenders who are knowledgeable, professional, and genuinely easy to talk to. They’ve helped many of my clients, I’ve even sent my kids to them, and they’ll walk you through your options carefully, so you feel informed and supported from the start.'
                },
                {
                    id: 'buy-5',
                    question: 'How much money do I need to buy a home in Arizona?',
                    answer: 'It depends on your loan type, down payment, and closing costs. Many buyers can purchase with around 3% down, and sometimes even less depending on the loan program. This is one of the first things my trusted lending team will help you evaluate so you know what you qualify for and what feels comfortable. Once we have those numbers, we’ll use that information to narrow down your home search and make sure you’re shopping with a clear plan.'
                },
                {
                    id: 'buy-6',
                    question: 'Are there zero-down or low-down loan options in Phoenix?',
                    answer: 'Yes. Some buyers qualify for low-down or even zero-down loan programs, such as VA loans, and there are also down payment assistance options depending on eligibility. A trusted lender can help confirm what you qualify for, and I’m happy to help make that connection.'
                },
                {
                    id: 'buy-7',
                    question: 'Should I buy now or wait for interest rates to drop?',
                    answer: 'That depends on your timeline and overall strategy. Waiting for lower rates often means more competition, higher prices, and fewer negotiation opportunities. In many Phoenix Metro neighborhoods, higher interest rate periods can actually create better buying conditions because there are fewer buyers competing for the same homes.\n\nThere are also strategies that can make buying now more affordable, including seller-paid rate buydowns, negotiating closing cost credits, or purchasing at a better price now and refinancing later when rates come down. The right approach depends on your budget, goals, and how long you plan to stay in the home. I’m happy to walk through the options with you and help you choose the smartest path forward.'
                },
                {
                    id: 'buy-8',
                    question: 'How competitive is the Phoenix housing market right now?',
                    answer: 'It depends on the neighborhood, price point, and time of year. Some areas move quickly, while others offer more room to negotiate. I’ll help you understand what’s happening in the specific areas you’re considering so you know when to move quickly and when to take your time. You can also check my latest Phoenix market reports and neighborhood data on this site, including trends like average days on market and recent closing prices.'
                },
                {
                    id: 'buy-9',
                    question: 'What should I look for when touring homes in Phoenix?',
                    answer: 'Beyond the home itself, pay close attention to the neighborhood. Traffic patterns, noise levels, parking, nearby freeways, and what’s close by day-to-day can make a bigger difference than buyers expect. You can always change finishes, but it’s much harder to change location, street activity, or the way a home feels at different times of day. And don’t worry, before you’re fully committed, we’ll have a professional home inspector complete a detailed inspection, so you understand the true condition of the property.'
                },
                {
                    id: 'buy-10',
                    question: 'Can I negotiate price or closing costs as a buyer?',
                    answer: 'Yes. Negotiation is more than just price. Depending on the home and the market, we may negotiate closing costs, repairs, timelines, or other terms. I’ll explain your options clearly, share my insight, and then help you move forward in the way that feels right for you.'
                },
                {
                    id: 'buy-11',
                    question: 'What is earnest money and how much is typical in Arizona?',
                    answer: 'Earnest money shows a seller you’re serious about the purchase. In the Phoenix Metro Area, it’s often around 1% of the purchase price, but everything in a real estate contract is negotiable. The amount can vary depending on the property, price point, and overall strategy. Earnest money is held in escrow and applied toward your purchase at closing as long as contract terms are met.'
                },
                {
                    id: 'buy-12',
                    question: 'What is the inspection period in Arizona?',
                    answer: 'The inspection period in Arizona is commonly around 10 days after contract acceptance, but it is negotiable. The timeline can be adjusted depending on the property, the seller’s situation, and market conditions. During this period, you complete inspections and evaluate the condition of the home before deciding whether to move forward, request repairs, or renegotiate terms.'
                },
                {
                    id: 'buy-13',
                    question: 'What happens after my offer is accepted?',
                    answer: 'Once your offer is accepted, we move into inspections, appraisal, title work, and lender deadlines. This part can feel overwhelming, but you won’t be guessing. I’ll keep everything organized, explain what’s happening step by step, and guide you through each decision all the way to closing.'
                },
                {
                    id: 'buy-14',
                    question: 'What happens if the appraisal comes in lower than the contract price?',
                    answer: 'If the appraisal is lower than the agreed price, we review options. That could mean renegotiating with the seller, adjusting your down payment, or reassessing the deal. I walk you through the financial and strategic impact before you make a decision.'
                },
                {
                    id: 'buy-15',
                    question: 'How long does it take to buy a home in Phoenix?',
                    answer: 'Most home purchases take about 30–45 days from contract to closing, depending on financing, appraisal timing, and inspections. I’ll outline the timeline early so you know what to expect and can plan with confidence.'
                },
                {
                    id: 'buy-16',
                    question: 'Do buyers pay Realtor fees in Phoenix?',
                    answer: 'Commission structures can vary depending on the transaction. Before we begin, I explain how representation works and what to expect financially so there are no surprises later.'
                },
                {
                    id: 'buy-17',
                    question: 'Is new construction better than resale in the Phoenix area?',
                    answer: 'Both have advantages. New construction offers modern layouts and energy efficiency. Resale homes may offer established neighborhoods, mature landscaping, and potentially more room to negotiate. The right choice depends on your goals and budget.'
                },
                {
                    id: 'buy-18',
                    question: 'Do I need a Realtor when buying from a home builder?',
                    answer: 'Yes, and it’s important to bring your Realtor with you on the very first visit. Builders have their own sales team representing the builder’s interests, not yours. If you visit a model home or register without your Realtor, you may lose the ability to have representation in the transaction.\n\nEven if you’re just driving by and want to take a quick look, reach out to me first. I’ll coordinate it and gladly meet you at any builder in the Phoenix Metro Area so your interests are protected from the start.'
                }
            ]
        },
        {
            category: 'Selling a Home in the Phoenix Metro Area',
            icon: <DollarSign className="text-[#E76F51]" size={24} />,
            items: [
                {
                    id: 'sell-1',
                    question: 'What updates actually increase home value in Phoenix?',
                    answer: 'In most cases, the updates that increase value are the ones that reduce buyer hesitation and make the home feel well-maintained. In the Phoenix Metro, buyers pay close attention to condition. A home that feels solid and move-in ready attracts stronger offers and fewer repair demands.\n\nHigh-impact improvements often include:\n• HVAC servicing or replacement, especially given Arizona heat\n• Roof repairs if aging or damaged\n• Addressing plumbing leaks or electrical issues\n• Fixing deferred maintenance\n• Fresh paint and clean, neutral finishes\n• Basic landscaping cleanup for curb appeal\n\nMajor remodels don’t always return dollar for dollar. Strategic repairs and smart cosmetic updates often create a better overall outcome by reducing negotiation pressure and supporting the appraisal. Before spending money, I’ll walk the property with you and help prioritize what actually makes sense for your neighborhood and price point.'
                },
                {
                    id: 'sell-2',
                    question: 'How important is vacant home staging in the Phoenix Metro?',
                    answer: 'Very important. When a home is empty, buyers often focus on flaws instead of possibilities. Rooms can feel smaller, layouts are harder to interpret, and listing photos don’t stand out. In today’s Phoenix market, buyers form an opinion online before they ever step through the door.\n\nFor vacant listings, I coordinate professional staging through Style & Staging, a leading vacant home staging company serving the Phoenix Metro. The focus isn’t decorating. It’s strategic presentation that helps buyers understand scale, flow, and how the home lives the moment they walk in. Properly staged vacant homes show better, photograph better, and typically attract stronger interest than empty properties.'
                },
                {
                    id: 'sell-3',
                    question: 'Can you sell my home if it’s vacant?',
                    answer: 'Yes. Vacant homes can sell very well when they’re positioned correctly. I coordinate trusted local partners to ensure the property stays maintained and show-ready while it’s on the market, including:\n• Vacant home staging through Style & Staging\n• Landscaping and yard maintenance\n• Pool service\n• Professional cleaning\n• Minor repairs and touch-ups\n• Regular property check-ins\n\nA vacant home should feel intentional and cared for, not empty or neglected. When presentation and maintenance are handled properly, vacant properties can compete strongly in the Phoenix Metro market.'
                },
                {
                    id: 'sell-4',
                    question: 'How do you handle multiple-offer situations?',
                    answer: 'When multiple offers come in, we evaluate more than price. Financing strength, contingencies, appraisal risk, timeline, and buyer reliability all matter. The strongest offer is not always the highest one.\n\nMy job is to protect your position. I’ll review every offer from all angles, give you my honest assessment, and help you understand what’s most likely to close smoothly. From there, the decision is yours.'
                },
                {
                    id: 'sell-5',
                    question: 'Should I accept the first offer on my home?',
                    answer: 'Sometimes the first offer is the strongest one you’ll see. Sometimes it’s just the starting point. The decision depends on the strength of the offer, how much activity you’ve had, and what the current Phoenix market is doing in your price range and neighborhood.\n\nI’ll evaluate demand, showing activity, comparable sales, and market momentum. I can provide as much data as you’d like to review. I’ll also give you my recommendation based on your goals and comfort level. Then we decide how to respond strategically.'
                },
                {
                    id: 'sell-6',
                    question: 'What makes your selling strategy different?',
                    answer: 'Selling in the Phoenix Metro takes more than putting a sign in the yard. Pricing is deliberate. Presentation is intentional. Marketing is strategic. I look at your property through both a buyer lens and a financial lens, drawing on my experience in real estate investing and staging.\n\nThe goal is simple: position your home to attract serious buyers, generate strong offers, and move through inspections and appraisal with as few surprises as possible. You’ll know what’s happening at every step, and you’ll have clear guidance before making decisions.'
                }
            ]
        },
        {
            category: 'Relocating to the Phoenix Valley',
            icon: <MapPin className="text-[#218380]" size={24} />,
            items: [
                {
                    id: 'reloc-1',
                    question: 'What areas of the Phoenix Metro are growing the fastest?',
                    answer: 'Phoenix is one of the largest metropolitan areas in the country, and metros this size typically grow fastest at the outer edges where there is room to expand. That is exactly what we are seeing in the Valley right now. The fastest growth is happening in the Southeast Valley around Queen Creek and in West Valley cities like Buckeye, Goodyear, and Surprise. At the same time, established areas such as Phoenix, Mesa, Chandler, and Gilbert continue to grow steadily, supported by ongoing job expansion across the region.'
                },
                {
                    id: 'reloc-2',
                    question: 'How do I decide which area of the Phoenix valley is the right fit for me?',
                    answer: 'The best way to choose the right area of the Phoenix Valley is to start with your daily lifestyle, not the map. Most relocation decisions come down to commute time, budget, and what you want close by, like restaurants, outdoor access, golf, shopping, or newer construction. The East Valley tends to offer major job corridors and newer suburban communities, the West Valley often has more space and new builds, and Central Phoenix is ideal for people who want character neighborhoods and a more connected, urban feel. Once you know your work location and preferred lifestyle, the right area usually becomes clear fast.'
                },
                {
                    id: 'reloc-3',
                    question: 'Can I close remotely if I’m relocating from out of state?',
                    answer: 'Yes. Many transactions can be completed remotely. Inspections, lender coordination, and document signing can often be handled without you physically present in Arizona.'
                },
                {
                    id: 'reloc-4',
                    question: 'What should I know about HOAs in Phoenix?',
                    answer: 'HOAs are common in many Phoenix Metro communities. Fees, rules, and amenities vary significantly. Before you move forward, we review HOA documents so you understand restrictions, costs, HOA health and expectations.'
                },
                {
                    id: 'reloc-5',
                    question: 'How do property taxes work in Arizona?',
                    answer: 'Arizona property taxes are generally lower than many states. Taxes are based on assessed value and vary by municipality and school district. We can estimate likely taxes before you purchase.'
                }
            ]
        },
        {
            category: 'First-Time Home Buyer Questions',
            icon: <Users className="text-[#8E9AAF]" size={24} />,
            items: [
                {
                    id: 'first-1',
                    question: 'What are common mistakes first-time buyers make?',
                    answer: 'First-time buyers often make a few avoidable mistakes, like starting to tour homes before getting fully pre-approved, skipping important inspection steps, or assuming they have no negotiating power in the process. They also tend to underestimate total monthly costs beyond the mortgage, including taxes, insurance, HOA fees, and utilities. The good news is these issues are easy to avoid with the right guidance upfront. My job is to help you walk into the process prepared, protected, and confident so you don’t leave money or leverage on the table.'
                },
                {
                    id: 'first-2',
                    question: 'How much should I budget beyond my down payment?',
                    answer: 'In addition to your down payment, plan for closing costs, inspections, appraisal fees, and moving expenses. I always recommend budgeting an additional 2–4% of the purchase price to cover these costs, depending on the loan type and transaction details. I’ll connect you with my trusted lender early in the process so you receive clear, detailed estimates upfront and can plan with confidence.'
                },
                {
                    id: 'first-3',
                    question: 'Is buying better than renting in Phoenix?',
                    answer: 'In most cases, buying makes more sense than renting if you’re financially prepared and plan to stay in the area for several years. Renting offers flexibility, but it does not build equity or create long-term stability. With a fixed-rate mortgage, your principal and interest payment stays consistent while you build ownership and position yourself to benefit from appreciation over time. The key is making sure the numbers work for you, and I’m here to help you evaluate that clearly before you make a move.'
                }
            ]
        }
    ]

    return (
        <div className="py-24 px-6 bg-[#FAF9F6] min-h-screen">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-[#333333] mb-6 font-serif">
                        Phoenix Real Estate FAQ
                    </h1>
                    <p className="text-2xl text-[#E76F51] font-medium font-serif">
                        Buying, Selling, Relocating & First-Time Buyers
                    </p>
                </motion.div>

                <div className="space-y-16">
                    {faqData.map((category, catIndex) => (
                        <div key={catIndex}>
                            <div className="flex items-center space-x-4 mb-8 border-b border-gray-200 pb-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm">
                                    {category.icon}
                                </div>
                                <h2 className="text-3xl font-bold text-[#333333] font-serif">
                                    {category.category}
                                </h2>
                            </div>

                            <div className="space-y-4">
                                {category.items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                        className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100"
                                    >
                                        <button
                                            onClick={() => toggleFAQ(item.id)}
                                            className="w-full text-left px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="text-lg font-semibold text-[#333333] pr-4 leading-tight">
                                                {item.question}
                                            </span>
                                            <span className="text-[#E76F51] transition-transform duration-300">
                                                {openIndex === item.id ? <Minus size={24} /> : <Plus size={24} />}
                                            </span>
                                        </button>
                                        <AnimatePresence>
                                            {openIndex === item.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div className="px-8 pb-8 text-[#555555] leading-relaxed whitespace-pre-line text-[1.0625rem] pt-2">
                                                        {item.answer}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 text-center bg-white p-16 rounded-3xl shadow-md border border-gray-100"
                >
                    <h3 className="text-3xl font-bold text-[#333333] mb-4 font-serif">
                        Still have questions?
                    </h3>
                    <p className="text-xl text-[#555555] mb-8 max-w-2xl mx-auto">
                        Real estate decisions are personal. If you're looking for guidance specific to your home or goals, reach out anytime. I'm here to help.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block bg-[#E76F51] text-white px-12 py-4 rounded-xl font-semibold hover:bg-[#E76F51]/90 transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                        Contact Lara Chapman
                    </a>
                </motion.div>
            </div>
        </div>
    )
}

export default FAQ
