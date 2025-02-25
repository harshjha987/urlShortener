"use client"
import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Instant Link Shortening",
      description:
        "Shorten long, messy URLs into sleek, shareable links in just a click.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Advanced Analytics",
      description:
        "Track link performance with real-time click data, geolocation insights, and referral sources.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Custom Short Links",
      description:
        "Create branded or customized short URLs to make them memorable and increase engagement.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Lightning-Fast Redirects",
      description: "Optimized for speed, ensuring users are instantly redirected with minimal delay.",
      icon: <IconCloud />,
    },
    {
      title: "User-Friendly Dashboard",
      description: "Manage and monitor all your shortened links in one simple, intuitive interface.",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "Link Expiry & Management",
      description:
        "Set expiration dates for links or delete them anytime for full control over your shared URLs",
      icon: <IconHelp />,
    },
    {
      title: "QR Code Generation",
      description:
        "Instantly generate QR codes for every short link, making offline sharing effortless.",
      icon: <IconAdjustmentsBolt />,
    },
    {
        title: "Mobile-Friendly & Responsive",
        description:
          "Easily shorten and share links from any device, whether desktop, tablet, or smartphone.",
        icon: <IconAdjustmentsBolt />,
      },
    
  ];
  return (
    
    <div className="max-w-7xl mx-auto text-center py-10">
        
  {/* Title */}
  <h2 className="text-3xl font-bold text-gray-200 mb-6 underline"> Key Features</h2>
  
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-2 max-w-7xl mx-auto">
    
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
      
    </div>
    
    </div>
    
    
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
