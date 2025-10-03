import React, { useEffect, useState } from "react";
import { getAllServices, getServiceCategories } from "./serviceApi";
import SectionButton from "@/components/SectionButton";
import Button from "@/components/Button";
import { GoArrowRight } from "react-icons/go";
import CategoryCard from "@/features/category/CategoryCard";
import { Category } from "@/types/category";
import { Service } from "@/types/service";
import { api } from "@/lib/api";
import { useParams } from "react-router-dom";
import { useService } from "./hooks/useService";
import { useCategories } from "./hooks/useCategories";



const ServiceCategories: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  // const { service, loading: servLoading , error: servError } = useService(Number(categoryId));
  const { categories, loading: catLoading, error: catError } = useCategories();

  // if (servLoading || catLoading) return <p className="text-center mt-8">Loading...</p>
  // if (servError || catError) return <p className="text-center text-red-500">{catError || servError}</p>

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

      <div className="mt-30 flex flex-col p-4 rounded-2xl bg-[var(--secondary--color-1)] staff-line-svg">
        <h2 className="mt-4 p-4 text-3xl text-[var(--neutral--100)]">
          Get a budget today for your
          <span className="text-[var(--accent--primary-1)]"> new project</span>!
        </h2>
        <button className="my-4 btn-primary">
          Get a quote
          <GoArrowRight />
        </button>
        <div className="m-2 p-4 text-[var(--neutral--100)]">
          <p className="text-sm">Call us</p>
          <p className="font-semibold">(+1) 240 640-3500</p>
        </div>
        <div className="m-2 p-4 text-[var(--neutral--100)]">
          <p className="text-sm">Email us</p>
          <p className="font-semibold">contact@fixitek.com</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCategories;
