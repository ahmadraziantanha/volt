export type ArticleCategory = "ENGINEERING" | "CULTURE" | "STUDIO" | "BRAND";

export interface ArticleSection {
  type: "p" | "h2" | "blockquote";
  text: string;
}

export interface Article {
  slug: string;
  title: string;
  category: ArticleCategory;
  date: string;
  readTime: number;
  excerpt: string;
  coverImage: string;
  content: ArticleSection[];
}

export const ARTICLES: Article[] = [
  {
    slug: "the-physics-of-resolution",
    title: "The Physics of Resolution",
    category: "ENGINEERING",
    date: "May 2026",
    readTime: 6,
    excerpt:
      "Most audiophile debates miss the point. Resolution isn't a spec on a box — it's a decision made long before the driver is installed.",
    coverImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=700&auto=format&fit=crop&q=80",
    content: [
      {
        type: "p",
        text: "The term 'high-resolution audio' has been stretched so thin it barely means anything anymore. Marketing teams print it on packaging. Streaming services sell subscriptions around it. But walk into the room where we tune our drivers and ask an engineer what resolution actually means — you'll get a longer answer than you expected.",
      },
      {
        type: "p",
        text: "Resolution, at its core, is about information. How much of a recording can your system faithfully reproduce — and more importantly, how much of that information can your ear distinguish. These are two separate questions, and most of the industry only answers the first one.",
      },
      {
        type: "h2",
        text: "The 20–20,000 Hz Myth",
      },
      {
        type: "p",
        text: "Human hearing is commonly cited as spanning 20 Hz to 20,000 Hz. What that figure leaves out is that hearing is not linear across that range — and that the frequencies we're most sensitive to, roughly 2–5 kHz, are exactly where most drivers introduce the most distortion. This is the range of vocal intelligibility, the leading edge of cymbals, the bite of a guitar string. It's where music lives.",
      },
      {
        type: "p",
        text: "When we designed the driver for the Field Pro, we spent eleven months on that 2–5 kHz window alone. Not because the numbers looked bad — they didn't. But because our reference engineers could hear something in acoustic guitar recordings that no measurement had flagged. A slight smearing of the attack. A loss of the room. Something that felt less like detail and more like distance.",
      },
      {
        type: "blockquote",
        text: "Measurements tell you where you are. Listening tells you where you need to go. The best engineers we've worked with are the ones who can do both, and know which one to trust.",
      },
      {
        type: "h2",
        text: "Materials Under Pressure",
      },
      {
        type: "p",
        text: "The diaphragm material is where most driver design decisions get made. A stiffer diaphragm moves more uniformly — better transient response, less distortion at the cost of added mass. A lighter diaphragm extends high-frequency response but introduces breakup modes, points where the material stops moving as a single unit and starts doing its own thing.",
      },
      {
        type: "p",
        text: "Our Field series uses a composite diaphragm we developed with a materials lab in Eindhoven. The base is a bio-cellulose structure — chosen for its natural self-damping properties — coated with a proprietary carbon layer that adds rigidity without adding meaningful mass. It performs differently in humidity. It performs differently at temperature extremes. We test it at both, and we sign off on the tuning at both.",
      },
      {
        type: "p",
        text: "None of this is visible on the product page. It shouldn't need to be. The work lives in the sound.",
      },
    ],
  },
  {
    slug: "engineering-quiet",
    title: "Engineering Quiet",
    category: "ENGINEERING",
    date: "Mar 2026",
    readTime: 8,
    excerpt:
      "Noise cancellation is one of the most misunderstood technologies in consumer audio. Here's how it actually works — and why getting it right is harder than the spec sheet suggests.",
    coverImage:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=700&auto=format&fit=crop&q=80",
    content: [
      {
        type: "p",
        text: "Active noise cancellation is, at its most basic, a physics trick. A microphone samples incoming sound, a processor inverts the waveform, and a speaker plays the inverted signal back through the driver — cancelling the original before it reaches your ear. In theory, it's elegant. In practice, it is one of the most latency-sensitive, acoustically fragile problems in consumer electronics.",
      },
      {
        type: "h2",
        text: "Feed-Forward vs. Feedback",
      },
      {
        type: "p",
        text: "Most consumer headphones use a feedforward architecture: the microphone sits outside the earcup, sampling the environment before it reaches the driver. This gives the processor time to react — but the microphone is sampling a different acoustic environment than your ear. The result is ANC that works well for steady-state noise (aircraft cabin, air conditioning) and less well for transient or unpredictable sources.",
      },
      {
        type: "p",
        text: "Feedback ANC places the microphone inside the earcup, as close to your ear canal as geometry allows. It's listening to what you're actually hearing. This makes it far more accurate — but the latency requirement drops to sub-millisecond levels, and the risk of instability (the howl you sometimes hear when ANC malfunctions) increases significantly.",
      },
      {
        type: "blockquote",
        text: "The Atlas uses a hybrid architecture that runs both systems simultaneously, with the processor deciding in real time which signal to weight more heavily depending on the noise environment.",
      },
      {
        type: "h2",
        text: "The Transparency Problem",
      },
      {
        type: "p",
        text: "Transparency mode — sometimes called passthrough or ambient — is the harder engineering challenge. The goal is to make it feel as if you're not wearing headphones at all, while still delivering audio through the drivers. The microphone samples the environment, the processor applies minimal processing, and the sound is mixed with your audio. Simple in concept.",
      },
      {
        type: "p",
        text: "The problem is that microphones do not sound like ears. They have different frequency responses, different spatial sensitivity, different phase behaviour. A transparency mode implemented naively sounds processed, almost telephonic. You can hear that you're wearing a device. Our processing team spent four months building a compensation model — a set of filters that makes the microphone output sound like an open ear rather than a measurement device.",
      },
      {
        type: "p",
        text: "The result isn't perfect. Nothing is. But when you flip the Atlas to transparency mode in a quiet room, you should be able to have a conversation without thinking about the headphones. That's the standard we hold it to.",
      },
    ],
  },
  {
    slug: "porto-midnight",
    title: "Porto, Midnight, and the Field Pro",
    category: "CULTURE",
    date: "Jan 2026",
    readTime: 4,
    excerpt:
      "Our lead acoustics engineer on what it means to actually listen — and why the best test we run isn't in a lab.",
    coverImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=700&auto=format&fit=crop&q=80",
    content: [
      {
        type: "p",
        text: "There's a café on Rua das Flores that we've been going to since before VOLT had a name. The owner plays jazz on a system that cost less than our prototype drivers. It sounds better than most listening rooms I've been in.",
      },
      {
        type: "p",
        text: "I think about that café a lot when we're in the final stages of tuning. Not because I'm trying to replicate it — that would be a category error. But because it reminds me that the point isn't the technology. The technology is a means to an end. The end is something that happens in a room, in a particular moment, when music gets out of the way of itself and becomes experience.",
      },
      {
        type: "h2",
        text: "The Midnight Walk",
      },
      {
        type: "p",
        text: "The last thing I do before a product signs off is take it for a walk. Not a measurement. Not a focus group. A walk, usually at midnight, through the part of Porto between our office and the river. Tram cables overhead. Cobblestone underfoot. The city has a sound that's specific to itself — stone and water and traffic at a distance and the occasional burst of music from an open window.",
      },
      {
        type: "p",
        text: "The Field Pro passed its midnight walk on a cold Tuesday in February. I was listening to a recording I've been using as a reference for three years — a live piano session that was captured with two microphones in a converted church in Lisbon. When I can hear the room, when the reverb tail sounds like stone and height and air rather than algorithmic decay, I know we're done.",
      },
      {
        type: "blockquote",
        text: "The best test isn't a frequency plot. It's whether you forget you're wearing something.",
      },
      {
        type: "p",
        text: "I walked for two hours. I got back to the office and sent a message to the team: we're done. The Field Pro shipped three weeks later.",
      },
    ],
  },
  {
    slug: "why-we-dont-run-sales",
    title: "Why We Don't Run Sales",
    category: "BRAND",
    date: "Nov 2025",
    readTime: 3,
    excerpt:
      "A short explanation of our pricing policy, and why 'no sales, ever' is a feature rather than a limitation.",
    coverImage:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=700&auto=format&fit=crop&q=80",
    content: [
      {
        type: "p",
        text: "Every year, around late November, we get asked the same question: when is your Black Friday sale? The answer is always the same: we don't run one. We don't run any sales.",
      },
      {
        type: "p",
        text: "This isn't stubbornness. It's a decision we made deliberately, for reasons that are worth explaining.",
      },
      {
        type: "h2",
        text: "What Sales Actually Say",
      },
      {
        type: "p",
        text: "When a brand runs a sale, it's making an implicit statement about its regular prices: that they were higher than the product was worth. The 'true' price is the sale price. The regular price was a number designed to be discounted from.",
      },
      {
        type: "p",
        text: "We price our products at what we believe they're worth, accounting for the materials, the labour, the testing, and a margin that keeps us independent and able to invest in the next generation of work. That's the only price we charge. It doesn't go up before a sale period. It doesn't come down because a calendar event says it should.",
      },
      {
        type: "blockquote",
        text: "If you buy a VOLT product today, you're paying what someone bought it for last year, and what someone will pay for it next year. That's the deal.",
      },
      {
        type: "h2",
        text: "The Other Side of the Policy",
      },
      {
        type: "p",
        text: "There's a corollary to this. Because we don't run sales, we don't manufacture urgency. There's no countdown timer on our product pages. There's no 'only 3 left' badge that refreshes every hour. We don't send emails with subject lines designed to trigger anxiety.",
      },
      {
        type: "p",
        text: "We think most people, given accurate information and enough time, make good decisions about what they actually need. Our job is to provide accurate information. The decision is yours.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
