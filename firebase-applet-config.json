import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, ArrowRight, User, BookOpen } from 'lucide-react';

interface BlogDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  image?: string;
  content: string[];
  author: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-streetwear-evolution',
    title: 'PREMIUM STREETWEAR: THE EVOLUTION OF MODERN STYLE',
    date: '23.06.2026',
    readTime: '3 MIN READ',
    category: 'STREETWEAR',
    excerpt: 'Premium streetwear has transformed the fashion industry by combining luxury craftsmanship with everyday comfort. Explore how quality and practicality define a new global movement.',
    author: 'SOCIETY STUDIOS',
    content: [
      'Premium streetwear has transformed the fashion industry by combining luxury craftsmanship with everyday comfort.',
      'Consumers increasingly seek clothing that offers both quality and practicality. This demand has elevated streetwear from a niche movement into a global fashion category.',
      '### DEFINING THE GENERATION',
      'Premium fabrics, modern fits, and refined aesthetics define the new generation of streetwear brands.',
      '### THE BALANCE AT SOCIETY STUDIOS',
      'Society Studios embraces this evolution by creating garments that balance comfort, quality, and contemporary design.',
      '### STYLE AND SUBSTANCE',
      'The future of fashion belongs to brands that understand both style and substance.',
      'Premium streetwear represents exactly that balance.'
    ]
  },
  {
    id: 'post-trends',
    title: 'THE ENDURING STYLE: WHY CLASSIC TRUMPS TRENDS',
    date: '23.06.2026',
    readTime: '3 MIN READ',
    category: 'PHILOSOPHY',
    excerpt: 'The fashion industry constantly introduces new trends, but not every trend stands the test of time. Explore how timeless essentials provide lasting value and effortless style.',
    author: 'SOCIETY STUDIOS',
    content: [
      'The fashion industry constantly introduces new trends, but not every trend stands the test of time.',
      'Timeless fashion focuses on enduring style rather than temporary popularity. It prioritizes quality, versatility, and authenticity.',
      '### BEYOND SEASONAL CYCLES',
      'At Society Studios, we aim to create clothing that remains relevant beyond seasonal fashion cycles.',
      'A well-designed hoodie or premium T-shirt should look just as good years from now as it does today.',
      '### THE ULTIMATE WARDROBE FOUNDATION',
      'By focusing on timeless essentials, individuals can build wardrobes that provide lasting value and effortless style.',
      '### A LIFETIME OF STYLE',
      'Fashion should evolve with the wearer, not expire with the season.'
    ]
  },
  {
    id: 'post-details',
    title: 'THE ART OF DETAIL: CRAFTSMANSHIP IN MODERN FASHION',
    date: '23.06.2026',
    readTime: '3 MIN READ',
    category: 'CRAFTSMANSHIP',
    excerpt: 'Great fashion is often defined by the details. Fabric selection, stitching quality, fit, and finishing techniques all contribute to the final product. Explore our commitment to quality.',
    author: 'SOCIETY STUDIOS',
    content: [
      'Great fashion is often defined by the details. While overall design matters, the small elements can make the biggest difference.',
      'Fabric selection, stitching quality, fit, and finishing techniques all contribute to the final product.',
      '### THE DEFINITION OF CRAFT',
      'Premium garments are distinguished by their craftsmanship. Every seam, cut, and material choice reflects a commitment to quality.',
      '### OUR DESIGN PHILOSOPHY',
      'At Society Studios, attention to detail is part of our design philosophy. We believe excellence is achieved through thoughtful decisions at every stage of creation.',
      '### BEYOND THE SURFACE',
      'These details may not always be immediately visible, but they significantly impact durability, comfort, and overall appearance.'
    ]
  },
  {
    id: 'post-black',
    title: 'THE POWER OF BLACK: THE ULTIMATE FOUNDATION OF STYLE',
    date: '23.06.2026',
    readTime: '3 MIN READ',
    category: 'PHILOSOPHY',
    excerpt: 'Black has maintained its status as one of fashion\'s most iconic colors for decades. Explore why this shade represents sophistication, confidence, and timeless elegance.',
    author: 'SOCIETY STUDIOS',
    content: [
      'Black has maintained its status as one of fashion\'s most iconic colors for decades. It represents sophistication, confidence, and timeless elegance.',
      '### THE UNIVERSAL COLOR',
      'One reason black remains so popular is its versatility. It pairs effortlessly with virtually every other color and works across all seasons.',
      '### REFINED SIMPLICITY',
      'Black garments also create a clean, refined appearance that never feels outdated. From hoodies and T-shirts to jackets and trousers, black remains a staple in every modern wardrobe.',
      '### OUR COMMITMENT TO THE CORE',
      'At Society Studios, black reflects our commitment to simplicity and timeless design.',
      '### A RELIABLE FOUNDATION',
      'While trends continue to evolve, black remains a reliable foundation for modern style and self-expression.'
    ]
  },
  {
    id: 'post-comfort',
    title: 'THE FUTURE OF COMFORT: BALANCING STYLE AND WEARABILITY',
    date: '23.06.2026',
    readTime: '3 MIN READ',
    category: 'COMFORT',
    excerpt: 'Comfort has become one of the most important factors in contemporary fashion. Today\'s consumers expect clothing to look stylish while also supporting their daily lifestyle.',
    author: 'SOCIETY STUDIOS',
    content: [
      'Comfort has become one of the most important factors in contemporary fashion. Today\'s consumers expect clothing to look stylish while also supporting their daily lifestyle.',
      '### THE RISE OF STREETWEAR COMFORT',
      'The rise of premium streetwear reflects this shift. People no longer want to choose between looking good and feeling comfortable.',
      '### CRAFTING THE BALANCED SILHOUETTE',
      'Soft fabrics, relaxed fits, and thoughtful construction allow garments to move naturally with the body. These details improve both appearance and wearability.',
      '### INTEGRATED TO THE DETAIL',
      'At Society Studios, comfort is integrated into every design decision. We believe clothing should enhance everyday experiences rather than restrict them.',
      '### THE FUTURE OF COMFORT',
      'When fashion feels comfortable, confidence follows naturally. This balance between style and practicality defines the future of modern clothing.'
    ]
  },
  {
    id: 'post-wardrobe',
    title: 'BUILDING A TIMELESS WARDROBE: QUALITY OVER QUANTITY',
    date: '23.06.2026',
    readTime: '3 MIN READ',
    category: 'WARDROBE',
    excerpt: 'A timeless wardrobe is built on quality rather than quantity. Explore how a carefully curated collection of premium essentials can remain stylish for years.',
    author: 'SOCIETY STUDIOS',
    content: [
      'A timeless wardrobe is built on quality rather than quantity. Instead of constantly replacing trendy items, a carefully curated collection of essentials can remain stylish for years.',
      'The foundation of a timeless wardrobe includes premium T-shirts, versatile hoodies, quality outerwear, and well-fitting trousers.',
      '### ESSENTIAL SYNERGY',
      'These pieces can be mixed and matched effortlessly, creating countless outfit combinations without requiring an excessive number of garments.',
      '### TRANSCENDING TRENDS',
      'At Society Studios, we focus on creating pieces that transcend seasonal trends. Clean silhouettes and premium materials ensure our garments remain relevant regardless of changing fashion cycles.',
      '### THE FOUNDATION OF CREATIVITY',
      'Building a timeless wardrobe is not about limiting creativity. It is about creating a strong foundation that allows personal style to evolve naturally over time.',
      '### A SUSTAINABLE CHOICE',
      'When quality and versatility come together, fashion becomes simpler, smarter, and more sustainable.'
    ]
  },
  {
    id: 'post-expression',
    title: 'STREETWEAR AND SELF-EXPRESSION: THE LANGUAGE OF PERSONAL STYLE',
    date: '23.06.2026',
    readTime: '3 MIN READ',
    category: 'IDENTITY',
    excerpt: 'Fashion has always been a form of communication. Long before people speak, their clothing often creates a first impression. Discover how streetwear empowers self-expression.',
    author: 'SOCIETY STUDIOS',
    content: [
      'Fashion has always been a form of communication. Long before people speak, their clothing often creates a first impression. Streetwear has become one of the most powerful forms of self-expression in modern culture.',
      'Originally rooted in youth movements, skateboarding, and music scenes, streetwear gave individuals the freedom to showcase their identity through fashion.',
      '### THE POWER OF AUTHENTICITY',
      'Today, streetwear continues to evolve while maintaining its core principle: authenticity.',
      '### INDIVIDUALS OVER TRENDS',
      'At Society Studios, we believe clothing should help individuals express confidence and creativity. Every piece is designed to support personal style rather than define it.',
      'The best fashion isn\'t about following trends. It\'s about wearing clothing that feels authentic to who you are. Streetwear remains popular because it empowers people to express themselves comfortably and confidently.',
      '### THE FUTURE OF LANGUAGE',
      'As fashion evolves, self-expression will remain at the center of everything we create.'
    ]
  },
  {
    id: 'post-hoodie',
    title: 'THE ESSENTIAL HOODIE: A MODERN WARDROBE STAPLE',
    date: '23.06.2026',
    readTime: '3 MIN READ',
    category: 'ESSENTIALS',
    excerpt: 'A hoodie is one of the most versatile garments in modern fashion. Explore how it has evolved from casual wear to a premium staple of comfort and style.',
    author: 'SOCIETY STUDIOS',
    content: [
      'A hoodie is one of the most versatile garments in modern fashion. Once considered purely casual wear, the hoodie has evolved into a wardrobe essential that combines comfort, functionality, and style.',
      'A premium hoodie offers superior fabric quality, durability, and structure. Unlike lower-quality alternatives, it maintains its shape and comfort even after repeated wear and washing.',
      '### THE VERSATILITY OF FORM',
      'The beauty of a hoodie lies in its versatility. It can be paired with jeans for a casual look, layered beneath a jacket for colder weather, or styled with tailored trousers for a modern streetwear aesthetic.',
      '### EFFORTLESS STYLE AT SOCIETY STUDIOS',
      'At Society Studios, we view the hoodie as more than a basic item. It represents effortless confidence and contemporary fashion.',
      '### A LONG-TERM INVESTMENT',
      'Investing in a premium hoodie ensures long-lasting comfort and style while providing countless outfit possibilities throughout the year.'
    ]
  },
  {
    id: 'post-minimalism',
    title: 'MINIMALIST FASHION: THE ART OF CHOOSING BETTER',
    date: '23.06.2026',
    readTime: '3 MIN READ',
    category: 'PHILOSOPHY',
    excerpt: 'Instead of focusing on excessive branding, loud graphics, or short-lived trends, minimalist fashion emphasizes clean designs, quality materials, and timeless appeal. Explore the power of choice.',
    author: 'SOCIETY STUDIOS',
    content: [
      'Minimalist fashion has become one of the most influential movements in modern style. Instead of focusing on excessive branding, loud graphics, or short-lived trends, minimalist fashion emphasizes clean designs, quality materials, and timeless appeal.',
      'A minimalist wardrobe is built around versatile essentials that can be worn repeatedly without feeling outdated. Neutral colors such as black, white, grey, and beige create a cohesive look while making outfit combinations effortless.',
      '### THE BEAUTY OF SIMPLICITY',
      'One of the greatest benefits of minimalist fashion is simplicity. With fewer but better pieces, getting dressed becomes easier and more efficient. Every garment serves a purpose and complements the rest of the wardrobe.',
      '### OUR VISION AT SOCIETY STUDIOS',
      'At Society Studios, we believe simplicity is the ultimate form of sophistication. Our designs focus on premium materials, refined silhouettes, and understated elegance that remain relevant year after year.',
      '### THE MINIMALIST MINDSET',
      'Minimalism is not about owning less—it\'s about choosing better. By investing in quality essentials, you create a wardrobe that reflects confidence, purpose, and timeless style.',
      'Society Studios — Made for the New Society.'
    ]
  },
  {
    id: 'post-quality',
    title: 'WHY QUALITY MATTERS MORE THAN TRENDS IN MODERN FASHION',
    date: '23.06.2026',
    readTime: '5 MIN READ',
    category: 'QUALITY',
    excerpt: 'Fashion trends come and go, but quality never goes out of style. Why modern consumers are embracing a selective mindset and investing in timeless, durable garments.',
    author: 'SOCIETY STUDIOS',
    image: 'https://i.ibb.co/TM043sFH/download-1.jpg',
    content: [
      'Fashion trends come and go, but quality never goes out of style. In today\'s fast-paced world, consumers are becoming more selective about what they wear and how they spend their money. Instead of filling wardrobes with temporary trends, many people are choosing timeless pieces that offer comfort, durability, and long-term value.',
      'At Society Studios, we believe great clothing starts with exceptional quality. Every garment should feel comfortable, look refined, and remain a staple in your wardrobe for years. While trends can provide inspiration, quality is what creates lasting style.',
      '### THE LIFESPAN OF A GARMENT',
      'One of the biggest problems with fast fashion is its short lifespan. Many garments are designed to follow seasonal trends, often sacrificing quality to reduce production costs. As a result, fabrics fade, stitching weakens, and garments lose their shape after only a few washes. Consumers end up replacing these items frequently, spending more money over time.',
      '### THE PREMIUM EXPERIENCE',
      'Premium clothing offers a different experience. High-quality materials, careful construction, and attention to detail ensure that garments maintain their appearance and comfort for much longer. A well-made hoodie, T-shirt, or jacket can become a reliable part of your wardrobe for years, making it a smarter investment.',
      '### COMFORT AND CONFIDENCE',
      'Quality also contributes to confidence. When clothing fits properly and feels comfortable, it naturally enhances the way you carry yourself. Whether you\'re attending a meeting, traveling, or spending time with friends, premium essentials provide a polished appearance without sacrificing comfort.',
      '### THE VERSATILITY PRINCIPLE',
      'Another reason quality matters is versatility. Timeless designs can be worn across different seasons and occasions. A clean, minimalist hoodie can be paired with jeans, trousers, or layered under outerwear, creating multiple looks from a single piece. This flexibility helps simplify your wardrobe while maintaining a strong sense of style.',
      '### A MINDFUL APPROACH',
      'As fashion continues to evolve, consumers are increasingly embracing a "buy less, choose better" mindset. This shift reflects a growing appreciation for craftsmanship, durability, and responsible consumption. Rather than chasing every new trend, people are investing in pieces that align with their lifestyle and values.',
      '### INVESTMENTS IN SELF-EXPRESSION',
      'At Society Studios, our mission is to create clothing that stands the test of time. We focus on premium fabrics, modern silhouettes, and thoughtful design to deliver garments that look exceptional and feel even better. We believe fashion should be an investment in confidence, quality, and self-expression.',
      '### CONCLUSION',
      'Trends may define a season, but quality defines a wardrobe. By choosing well-made essentials over temporary fashion, you\'re not just buying clothing—you\'re building a collection of pieces that will remain relevant, reliable, and stylish for years to come.',
      'Society Studios — Made for the New Society.'
    ]
  },
  {
    id: 'post-0',
    title: 'THE FUTURE OF LUXURY STREETWEAR: REDEFINING MODERN FASHION',
    date: '23.06.2026',
    readTime: '8 MIN READ',
    category: 'FUTURE',
    excerpt: 'Fashion is constantly evolving, but few movements have transformed the industry as dramatically as luxury streetwear. Explore how premium brands and independent designers are blending comfort, exclusivity, and craftsmanship.',
    author: 'EDITORIAL TEAM',
    image: 'https://i.ibb.co/NdJZh7nJ/Hoodies-Free-delivery-on-adidas-UK.jpg',
    content: [
      'Fashion is constantly evolving, but few movements have transformed the industry as dramatically as luxury streetwear. Once considered a niche style inspired by urban culture, streetwear has become one of the most influential forces in modern fashion. Today, premium brands and independent designers are blending comfort, exclusivity, and craftsmanship to create clothing that speaks to a new generation of consumers.',
      'At Society Studios, we believe fashion should be more than clothing—it should be a statement of identity, confidence, and creativity. Luxury streetwear represents this philosophy perfectly, offering timeless pieces that combine everyday wearability with elevated design.',
      '### THE RISE OF LUXURY STREETWEAR',
      'Streetwear originated from skateboarding, hip-hop, and youth culture. What began as graphic T-shirts, oversized hoodies, and sneakers gradually evolved into a global fashion movement. Over the years, luxury fashion houses recognized the growing influence of streetwear and started incorporating its elements into their collections.',
      'The result was a new category: luxury streetwear. This style combines premium materials, refined silhouettes, and exceptional craftsmanship with the relaxed aesthetic that made streetwear popular in the first place. Consumers no longer have to choose between comfort and sophistication—they can have both.',
      'Today, luxury streetwear dominates fashion runways, social media platforms, and everyday wardrobes. Its influence extends beyond clothing, shaping how people express themselves and connect with modern culture.',
      '### WHY MODERN CONSUMERS PREFER PREMIUM ESSENTIALS',
      'One of the biggest shifts in fashion has been the move away from fast fashion and toward premium essentials. Consumers are becoming more intentional with their purchases, prioritizing quality over quantity.',
      'Premium essentials offer several advantages:',
      '1. Timeless Design: Trends come and go, but well-designed essentials remain relevant for years. Neutral colors, clean lines, and minimal branding make luxury streetwear versatile and easy to style.',
      '2. Superior Comfort: High-quality fabrics provide a better fit, improved durability, and enhanced comfort. Whether it\'s a heavyweight hoodie, premium cotton T-shirt, or tailored jogger, luxury streetwear prioritizes how garments feel as much as how they look.',
      '3. Sustainability: Investing in fewer, higher-quality pieces reduces waste and encourages more sustainable consumption habits. Durable garments last longer, reducing the need for frequent replacements.',
      '4. Personal Expression: Luxury streetwear allows individuals to express their personality without relying on loud graphics or excessive branding. The focus is on confidence, quality, and understated style.',
      '### BUILDING A MODERN WARDROBE',
      'Creating a versatile wardrobe doesn\'t require dozens of items. Instead, focus on foundational pieces that can be mixed and matched effortlessly.',
      'The Perfect Hoodie: A premium hoodie is one of the most versatile garments in any wardrobe. It can be worn with jeans, tailored trousers, or layered under outerwear. Look for heavyweight fabrics, clean construction, and a comfortable fit.',
      'Essential T-Shirts: A collection of high-quality T-shirts forms the backbone of modern dressing. Choose neutral colors such as black, white, grey, and beige for maximum versatility.',
      'Tailored Bottoms: Modern streetwear has moved beyond oversized sweatpants. Tailored joggers and relaxed-fit trousers offer comfort while maintaining a polished appearance.',
      'Statement Outerwear: A structured jacket or premium coat can instantly elevate an outfit. Quality outerwear provides both functionality and style, making it a worthwhile investment.',
      '### THE IMPORTANCE OF FABRIC QUALITY',
      'One of the defining characteristics of luxury streetwear is its emphasis on materials. Fabric quality directly impacts comfort, durability, and appearance.',
      'Premium cotton remains a favorite due to its softness and breathability. Heavyweight fleece provides warmth and structure, while innovative fabric blends improve flexibility and performance.',
      'High-quality garments maintain their shape after repeated washing, resist fading, and offer a more refined look over time. These details may seem small, but they significantly influence the overall wearing experience.',
      '### MINIMALISM AS A LIFESTYLE',
      'Modern luxury is no longer defined by flashy logos or excessive embellishments. Instead, it is characterized by simplicity, functionality, and attention to detail.',
      'Minimalist fashion focuses on clean silhouettes, balanced proportions, and neutral color palettes. This approach allows individual style to shine without overwhelming the outfit.',
      'A minimalist wardrobe also simplifies daily decisions. When every piece complements the others, getting dressed becomes effortless while maintaining a polished appearance.',
      '### FASHION AND CONFIDENCE',
      'Clothing has a powerful influence on how people feel. The right outfit can boost confidence, improve self-expression, and create a strong first impression.',
      'Luxury streetwear succeeds because it combines comfort with sophistication. Wearers feel relaxed while still looking refined. This balance is particularly valuable in today\'s world, where personal and professional boundaries continue to evolve.',
      'Whether attending a creative meeting, traveling, or spending time with friends, premium essentials provide confidence for every situation.',
      '### THE FUTURE OF FASHION',
      'As consumer preferences continue to evolve, the demand for quality, authenticity, and sustainability will only increase. Brands that prioritize craftsmanship, ethical production, and timeless design are positioned to lead the next generation of fashion.',
      'Technology will also play a significant role, from advanced fabrics to personalized shopping experiences. However, the core principles of great design will remain unchanged: quality materials, thoughtful construction, and genuine attention to detail.',
      'Luxury streetwear is more than a trend. It represents a shift toward intentional consumption and personal expression. Consumers are choosing garments that align with their values and support a more sustainable approach to fashion.',
      '### CONCLUSION',
      'Luxury streetwear has transformed the fashion landscape by blending comfort, quality, and sophistication. It offers a modern alternative to fast fashion while empowering individuals to express their unique style.',
      'At Society Studios, we embrace this evolution by creating pieces that reflect contemporary culture while maintaining timeless appeal. Every garment is designed with purpose, crafted with care, and built to become a lasting part of your wardrobe.',
      'Fashion should not be disposable. It should be meaningful, versatile, and inspiring. By investing in premium essentials and embracing modern luxury, you can build a wardrobe that looks exceptional today and remains relevant for years to come.'
    ]
  },
  {
    id: 'post-journey',
    title: 'SOCIETY STUDIOS: MORE THAN FASHION, A MODERN MOVEMENT',
    date: '23.06.2026',
    readTime: '7 MIN READ',
    category: 'JOURNEY',
    excerpt: 'At Society Studios, we believe clothing should do more than simply cover the body—it should tell a story, inspire confidence, and represent a lifestyle. Read our journey on building a modern movement.',
    author: 'SOCIETY STUDIOS',
    image: 'https://i.ibb.co/WN8XTMD1/download-2.jpg',
    content: [
      'Fashion has always been a reflection of culture, identity, and ambition. At Society Studios, we believe clothing should do more than simply cover the body—it should tell a story, inspire confidence, and represent a lifestyle. Our journey began with a simple vision: to create premium streetwear that combines timeless design, exceptional quality, and modern culture into a single experience.',
      'In a world filled with fast fashion and short-lived trends, Society Studios was built on a different philosophy. We wanted to create pieces that people would wear not just for a season, but for years. Pieces that feel as good as they look. Pieces that become part of everyday life.',
      '### THE INSPIRATION BEHIND SOCIETY STUDIOS',
      'Every great brand starts with a purpose. Society Studios was born from a passion for fashion, creativity, and self-expression. We noticed that many clothing brands focused heavily on trends, producing garments that quickly became outdated. At the same time, luxury fashion often felt inaccessible to the everyday consumer.',
      'We believed there was room for something different.',
      'Society Studios was created to bridge the gap between luxury and everyday wear. We wanted to bring premium-quality garments, sophisticated aesthetics, and modern design principles into clothing that could be worn every day.',
      'The result is a collection of carefully designed essentials that embody confidence, simplicity, and individuality.',
      '### THE MEANING OF SOCIETY STUDIOS',
      'The name "Society Studios" represents more than a clothing label.',
      '"Society" reflects the people who inspire us—creatives, dreamers, entrepreneurs, artists, and individuals who refuse to follow the crowd. It represents a community of people who embrace their unique identity while contributing to something larger than themselves.',
      '"Studios" symbolizes creativity, innovation, and craftsmanship. It is where ideas become reality and where vision transforms into products that people can connect with.',
      'Together, Society Studios represents a modern movement built around creativity, authenticity, and purpose.',
      '### DESIGNING FOR THE MODERN GENERATION',
      'Today\'s generation demands more from fashion than ever before. Consumers want quality, comfort, and meaning behind every purchase. They want clothing that adapts to their lifestyle while reflecting their personality.',
      'At Society Studios, every design begins with a simple question:',
      '"Would we wear this every day?"',
      'This approach allows us to focus on creating versatile pieces that seamlessly fit into modern life. Whether you\'re working, traveling, meeting friends, or exploring new opportunities, our clothing is designed to move with you.',
      'We believe true luxury is found in simplicity. Clean silhouettes, premium fabrics, thoughtful construction, and timeless aesthetics define every piece we create.',
      '### THE IMPORTANCE OF QUALITY',
      'Quality is at the heart of everything we do.',
      'In today\'s fast-paced fashion industry, many garments are produced quickly and discarded just as fast. Society Studios takes a different approach. We focus on creating products that are built to last.',
      'From fabric selection to final production, attention to detail guides every decision. Premium materials provide superior comfort, durability, and performance, ensuring that each garment maintains its appearance and feel over time.',
      'When customers purchase from Society Studios, they are investing in clothing designed for longevity rather than temporary trends.',
      '### THE RISE OF MODERN STREETWEAR',
      'Streetwear has evolved dramatically over the past decade. What once existed primarily within skateboarding and urban culture has become one of the most influential forces in global fashion.',
      'Luxury brands now embrace streetwear aesthetics, while streetwear brands continue to refine their craftsmanship and quality.',
      'Society Studios sits at the intersection of these two worlds.',
      'We combine the relaxed comfort and cultural relevance of streetwear with the sophistication and attention to detail typically associated with luxury fashion.',
      'This balance creates garments that feel modern yet timeless, bold yet refined.',
      '### BUILDING A LIFESTYLE BRAND',
      'Our vision extends beyond clothing.',
      'Society Studios aims to create an environment where creativity, ambition, and individuality thrive. We want our platform to inspire people to pursue their goals, express themselves authentically, and embrace their unique journey.',
      'Fashion is often the first impression people make, but confidence is what leaves a lasting impact.',
      'By creating premium essentials designed to elevate everyday experiences, we hope to help people feel their best every time they step out into the world.',
      '### SUSTAINABILITY AND CONSCIOUS CONSUMPTION',
      'The future of fashion requires responsibility.',
      'As consumers become increasingly aware of environmental challenges, brands must adopt more thoughtful practices. Society Studios believes in encouraging conscious purchasing decisions through timeless design and durable construction.',
      'Instead of encouraging excessive consumption, we focus on creating versatile garments that remain relevant season after season.',
      'A well-made hoodie, premium T-shirt, or tailored jacket can serve as a wardrobe staple for years. This approach reduces waste while providing greater value for customers.',
      'Quality over quantity remains one of our guiding principles.',
      '### LOOKING TOWARD THE FUTURE',
      'The journey of Society Studios is only beginning.',
      'As we continue to grow, our commitment to craftsmanship, innovation, and authenticity remains unchanged. We aim to expand our collections, refine our designs, and build a global community united by a shared appreciation for modern fashion.',
      'The future will bring new challenges, opportunities, and creative possibilities. Through it all, our mission stays the same: to create exceptional clothing that empowers individuals to express themselves confidently.',
      'We are excited to continue evolving while staying true to the values that inspired Society Studios from the very beginning.',
      '### A MESSAGE TO OUR COMMUNITY',
      'Every brand is defined by the people who support it.',
      'Society Studios exists because of individuals who believe in quality, creativity, and authentic self-expression. Whether you\'re discovering us for the first time or have been part of our journey from the beginning, your support helps shape the future of our brand.',
      'We see fashion as a conversation—a way to communicate who we are without saying a word.',
      'Thank you for being part of this story.',
      'Together, we are building something greater than clothing. We are creating a community driven by ambition, creativity, and confidence.',
      'Welcome to Society Studios.',
      'Made for the New Society.'
    ]
  },
  {
    id: 'post-1',
    title: 'THE ARCHITECTURE OF SILHOUETTE',
    date: '24.06.2026',
    readTime: '4 MIN READ',
    category: 'PHILOSOPHY',
    excerpt: 'An investigation into structural weight, oversized drape patterns, and why fabric density defines modern street posture.',
    author: 'SOCIETY STUDIO LABS',
    image: 'https://i.ibb.co/TM043sFH/download-1.jpg',
    content: [
      'In luxury streetwear, silhouette is not merely a outline; it is a solid architectural expression. For too long, contemporary garments have favored superficial prints over foundational form. Our studio stands on the belief that the architecture of a garment starts at the raw yarn level.',
      'To achieve the ultimate drape, we analyze the relationship between body kinetics and fabric resistance. Dropped shoulder layouts require a calculated slouch—too light and the fabric clings; too stiff and it restricts movement. By anchoring our core designs on dense, heavyweight 320 GSM organic cotton, the garment naturally suspends itself away from the skin, forming clean geometric planes that resist wrinkling.',
      'This geometric suspension creates what we call the "Active Slouch." It responds to gait and gesture without losing its structured form. True modern streetwear design is a delicate negotiation between bulk and breathing room, ensuring comfort without sacrificing an imposing, clean posture.'
    ]
  },
  {
    id: 'post-2',
    title: 'THE 500 GSM STANDARD',
    date: '18.06.2026',
    readTime: '6 MIN READ',
    category: 'CRAFT',
    excerpt: 'Inside the engineering of our double-layered hoodies. No drawstrings, pure-grain French loopback knit, and the pursuit of weight.',
    author: 'TEXTILE DIVISION',
    image: 'https://i.ibb.co/NdJZh7nJ/Hoodies-Free-delivery-on-adidas-UK.jpg',
    content: [
      'Weight is luxury you can feel. The tactile sensation of dropping a 500 GSM pure cotton hoodie over your shoulders is an immediate reassurance of quality and safety. But handling 500 GSM French terry loops is an engineering challenge that standard fast-fashion factories cannot execute.',
      'Our signature core hoodie is constructed using an unbrushed triple-thread loopback technique. Traditional hoodies use fleece brushing to create fake loft that wears thin after three washes. Our loopback cotton maintains a tight, dense, compact weave that actually gets softer and more structured with age.',
      'Furthermore, the exclusion of drawstrings is a conscious aesthetic choice. We engineered a dual-layered cross-over hood that maintains its structural dome even when down, framing the neck with sharp, architectural precision. The result is a sculptural piece that represents the pinnacle of luxury streetwear textile standards.'
    ]
  },
  {
    id: 'post-3',
    title: 'DECONSTRUCTED MODERNISM',
    date: '02.06.2026',
    readTime: '5 MIN READ',
    category: 'MANIFESTO',
    excerpt: 'Exploring our monochrome palettes, deliberate scarcity, and why we embed cryptographic ledger IDs on every release.',
    author: 'EDITORIAL DESK',
    image: 'https://i.ibb.co/WN8XTMD1/download-2.jpg',
    content: [
      'Monochrome is not the absence of color—it is the concentration of focus. When you strip away the distraction of vibrant palettes, you are left with the absolute truth of texture, seam placement, and shadow. Every Society item exists in a monochromatic dialogue: slate gray, mineral white, carbon black.',
      'This restraint is coupled with our commitment to deliberate scarcity. We do not manufacture for mass consumption. We believe in the preservation of value and the minimization of waste. Every item holds a purpose, crafted with materials intended to outlive transient seasonal trends.',
      'To authenticate this lifetime of ownership, every uniform from Society Studios is digitally mapped. This ensures that each garment is not just a clothing item, but a certified node within our decentralized fashion registry. The physical garment and its digital identity are permanently unified, granting access to exclusive offline workspaces and level-01 member showcases.'
    ]
  }
];

export default function BlogDrawer({ isOpen, onClose }: BlogDrawerProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (selectedPost) {
                setSelectedPost(null);
              } else {
                onClose();
              }
            }}
            className="fixed inset-0 bg-black z-[100] backdrop-blur-xs"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[500px] md:w-[600px] bg-[#fcfcfc] text-black z-[101] shadow-2xl flex flex-col h-full overflow-hidden border-l border-neutral-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 bg-white">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-neutral-400" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-neutral-400 uppercase">
                  SOCIETY JOURNAL
                </span>
              </div>
              <button
                onClick={() => {
                  if (selectedPost) {
                    setSelectedPost(null);
                  } else {
                    onClose();
                  }
                }}
                className="p-1 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer text-neutral-400 hover:text-black"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 select-none scrollbar-thin">
              <AnimatePresence mode="wait">
                {!selectedPost ? (
                  // Article List
                  <motion.div
                    key="blog-list"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-12 pb-8"
                  >
                    <div>
                      <h2 className="font-sans font-black text-3xl tracking-tight text-[#111111] uppercase mb-1">
                        THE JOURNAL
                      </h2>
                      <p className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
                        DEEP DIVE INTO MATERIAL ARCHITECTURE & POSTURE
                      </p>
                    </div>

                    <div className="space-y-8">
                      {BLOG_POSTS.map((post) => (
                        <div
                          key={post.id}
                          onClick={() => setSelectedPost(post)}
                          className="group cursor-pointer border-b border-neutral-100 pb-8 flex flex-col md:flex-row gap-5 items-start hover:opacity-90 transition-all"
                        >
                          {/* Details */}
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 text-[9px] font-mono tracking-widest text-neutral-400 mb-2">
                              <span className="text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-sm">
                                {post.category}
                              </span>
                              <span>{post.date}</span>
                              <span>•</span>
                              <span>{post.readTime}</span>
                            </div>

                            <h3 className="font-sans font-black text-base md:text-lg tracking-tight text-[#111111] group-hover:text-neutral-700 transition-colors uppercase leading-snug">
                              {post.title}
                            </h3>

                            <p className="text-xs text-neutral-500 leading-relaxed font-sans mt-2 line-clamp-2">
                              {post.excerpt}
                            </p>

                            <div className="flex items-center space-x-1 mt-4 text-xs font-mono font-medium text-black group-hover:translate-x-1 transition-transform">
                              <span>READ ARTICLE</span>
                              <ArrowRight className="h-3 w-3" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  // Full Article Reader
                  <motion.div
                    key="blog-reader"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="pb-12"
                  >
                    {/* Back Button */}
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="inline-flex items-center space-x-1.5 text-xs font-mono font-medium text-neutral-400 hover:text-black mb-6 transition-colors uppercase cursor-pointer"
                    >
                      <ArrowRight className="h-3.5 w-3.5 rotate-180" />
                      <span>BACK TO JOURNAL</span>
                    </button>

                    {/* Category & Date */}
                    <div className="flex items-center space-x-3 text-[10px] font-mono tracking-widest text-neutral-400 mb-3">
                      <span className="text-white bg-black px-2.5 py-0.5 rounded-sm">
                        {selectedPost.category}
                      </span>
                      <span>{selectedPost.date}</span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {selectedPost.readTime}
                      </span>
                    </div>

                    {/* Article Title */}
                    <h1 className="font-sans font-black text-2xl md:text-3xl leading-tight tracking-tight text-[#111111] uppercase mb-4">
                      {selectedPost.title}
                    </h1>

                    {/* Author block */}
                    <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-neutral-500 border-y border-neutral-100 py-3 mb-8 uppercase">
                      <User className="h-3.5 w-3.5 text-neutral-400" />
                      <span>WRITTEN BY: {selectedPost.author}</span>
                    </div>

                    {/* Content paragraphs */}
                    <div className="space-y-6 text-sm text-neutral-700 leading-relaxed font-sans">
                      {selectedPost.content.map((paragraph, index) => {
                        if (paragraph.startsWith('### ')) {
                          return (
                            <h3 key={index} className="font-sans font-black text-sm text-neutral-900 tracking-[0.1em] uppercase pt-6 pb-2 border-b border-neutral-100">
                              {paragraph.replace('### ', '')}
                            </h3>
                          );
                        }
                        return (
                          <p key={index} className={index === 0 ? "text-base font-medium text-neutral-900 first-letter:text-3xl first-letter:font-black first-letter:float-left first-letter:mr-2 first-letter:mt-1" : ""}>
                            {paragraph}
                          </p>
                        );
                      })}
                    </div>

                    {/* Quote or signature block */}
                    <div className="mt-12 pt-8 border-t border-neutral-100 text-center">
                      <span className="font-mono text-[9px] tracking-[0.4em] text-neutral-300 uppercase block mb-1">
                        SOCIETY STUDIOS APPAREL DIVISION
                      </span>
                      <span className="font-mono text-[8px] tracking-[0.3em] text-neutral-400 uppercase">
                        EST_2023_SANKT_PETERBURG
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
