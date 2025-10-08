import React from "react";
import SectionButton from "@/components/SectionButton";
import Button from "@/components/Button";
import { GoArrowRight } from "react-icons/go";
import CategoryCard from "@/features/category/CategoryCard";
import { useCategories } from "@/hooks/useCategories";
import ErrorDisplay from "@/components/ErrorDisplay";
import QuoteCard from "@/components/QuoteCard";
import { Link } from "react-router-dom";



const ServiceCategories: React.FC = () => {
  const { categories, loading: catLoading, error: catError } = useCategories();

  const ctaUrl = "/about";
  const ctaText = "Get a quote";

  if (catLoading) return <p className="text-center mt-8">Loading...</p>
  if (catError) return <ErrorDisplay message={catError} />

  return (
    <div className="mt-20 mx-4 flex flex-col items-center">
      <SectionButton>Our Services</SectionButton>
      <h2 className="text-2xl text-center text-[var(--neutral--800)]">
        Explore our wide range of services
      </h2>

      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          return (
            <CategoryCard
              key={cat.id}
              category={cat}
            />
          );
        })}
      </ul>

      <Button className="mt-10 flex gap-2">
        Our services
        <GoArrowRight />
      </Button>

     <div className="mt-10">
        <QuoteCard
          title="Contact our handyman team"
          highlight="today!"
        >
          <Button>
            <Link 
              to={ctaUrl}
              >
                {ctaText}
              </Link>
          </Button>
          <div className="mt-2 py-10 px-2 font-semibold text-[var(--neutral--100)]">
            <p>Call Us</p>
            <p>(+1) 240 640-3500</p>
            <p className="mt-4">Email Us: </p>
            <p>contact@fixitek.com</p>
          </div>
        </QuoteCard>
     </div>
    </div>
  );
};

export default ServiceCategories;
