export interface Investor {
  id: string;
  name: string;
  logo: string;
  type: string;
  portfolio: string[];
  location: string;
}

export const investors: Investor[] = [
  {
    id: "yc",
    name: "Y Combinator",
    logo: "/logos/yc.png",
    type: "Accelerator",
    portfolio: ["OpenAI", "Stripe", "Airbnb"],
    location: "San Francisco, CA",
  },
  {
    id: "sequoia",
    name: "Sequoia Capital",
    logo: "/logos/sequoia.png",
    type: "Venture Capital",
    portfolio: ["OpenAI", "Anthropic", "Mistral AI"],
    location: "Menlo Park, CA",
  },
  {
    id: "a16z",
    name: "Andreessen Horowitz",
    logo: "/logos/a16z.png",
    type: "Venture Capital",
    portfolio: ["Mistral AI", "Character.ai", "Perplexity"],
    location: "Menlo Park, CA",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logo: "/logos/microsoft.png",
    type: "Corporate",
    portfolio: ["OpenAI"],
    location: "Redmond, WA",
  },
  {
    id: "softbank",
    name: "SoftBank",
    logo: "/logos/softbank.png",
    type: "Venture Capital",
    portfolio: ["OpenAI", "Perplexity"],
    location: "Tokyo, Japan",
  },
];