"use client";

import { Container, Icons, Wrapper } from "@/components";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Marquee from "@/components/ui/marquee";
import SectionBadge from "@/components/ui/section-badge";
import WordRotate from "@/components/ui/word-rotate";
import { features, perks, pricingCards, reviews } from "@/constants";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronRight, UserIcon, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);
  const rotatingWords = ["rita-embroidery", "srjay", "jils", "nakul", "challenge-rate", "shree-om-jari"];

  return (
    <section className="w-full relative flex items-center justify-center flex-col px-4 md:px-0 py-8">
      <style jsx global>{`
        :root {
          --gradient: linear-gradient(to top left, #007adf, #00ecbc);
          --background: 220 65% 3.52%;
          --foreground: 220 10% 97.2%;
          --muted: 220 50% 13.2%;
          --muted-foreground: 220 10% 54.4%;
          --popover: 220 45% 5.72%;
          --popover-foreground: 220 10% 97.2%;
          --card: 220 45% 5.72%;
          --card-foreground: 220 10% 97.2%;
          --border: 220 50% 13.2%;
          --input: 220 50% 13.2%;
          --primary: 199 89% 48%;
          --primary-foreground: 220 10% 97.2%;
          --secondary: 220 50% 13.2%;
          --secondary-foreground: 220 10% 97.2%;
          --accent: 220 50% 13.2%;
          --accent-foreground: 220 10% 97.2%;
          --destructive: 0 62.8% 30.6%;
          --destructive-foreground: 220 10% 97.2%;
          --ring: 199 89% 48%;
          --radius: 0.5rem;
        }

        .dark {
          --background: 216 100% 98.04%;
          --foreground: 213.6 100% 4.9%;
          --primary: 199 89% 48%;
          --primary-foreground: 0 0% 100%;
          --card: 216 100% 98.04%;
          --card-foreground: 213.6 100% 4.9%;
          --popover: 0 0% 100%;
          --popover-foreground: 213.6 100% 4.9%;
          --secondary: 214.74 100% 92.55%;
          --secondary-foreground: 216 100% 0.98%;
          --muted: 213.6 100% 95.1%;
          --muted-foreground: 0 0% 40%;
          --accent: 213.6 100% 95.1%;
          --accent-foreground: 214.12 100% 50%;
          --destructive: 0 84.2% 60.2%;
          --destructive-foreground: 210 40% 98%;
          --border: 0 0% 90.2%;
          --input: 0 0% 90.2%;
          --ring: 199 89% 48%;
        }

        ::selection {
          background-color: #009ee4;
          color: hsl(var(--primary-foreground));
        }

        ::-webkit-scrollbar {
          width: 5px;
          background-color: hsl(var(--background));
          border-radius: 8px;
          scrollbar-width: thin;
        }

        ::-webkit-scrollbar-thumb {
          color: #009ee4;
          background-color: #009ee4;
          border-radius: 8px;
        }

        ::-webkit-scrollbar-track {
          background-color: hsl(var(--background));
        }

        .dotPattern {
          background-image: radial-gradient(
            rgb(35, 40, 68) 1px,
            transparent 1px
          );
          background-size: 25px 25px;
        }

        .use-automation-zoom-in {
          animation: automation-zoom-in 0.5s;
        }

        .card-mask {
          background: radial-gradient(
            ellipse at center,
            rgba(0, 158, 228, 0.15),
            transparent
          );
        }

        .gradient {
          background: conic-gradient(
            from 230.29deg at 51.63% 52.16%,
            #009ee4 0deg,
            #009ee4 67.5deg,
            rgb(108, 39, 157) 198.75deg,
            #009ee4 251.25deg,
            #009ee4 301.88deg,
            #009ee4 360deg
          );
        }

        .lamp {
          opacity: 1;
          transform: translateY(-200px) rotate(180deg) scale(2) translateZ(0px);
        }

        @keyframes automation-zoom-in {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      {/* hero */}
      <Wrapper>
        <div className="absolute inset-0 dark:bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10 h-[150vh]" />

        <Container>
          <div className="flex flex-col items-center justify-center py-20 h-full">
            <button className="group relative grid overflow-hidden rounded-full px-4 py-1 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
              <span>
                <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
              </span>
              <span className="backdrop absolute inset-[1px] rounded-full bg-neutral-950 transition-colors duration-200 group-hover:bg-neutral-900" />
              <span className="h-full w-full blur-md absolute bottom-0 inset-x-0 bg-gradient-to-tr from-primary/40"></span>
              <span className="z-10 py-0.5 text-sm text-neutral-100 flex items-center justify-center gap-1.5">
                <Image
                  src="/icons/sparkles-dark.svg"
                  alt="✨"
                  width={24}
                  height={24}
                  className="w-4 h-4"
                />
                Introducing NFC Visit Cards
                <ChevronRight className="w-4 h-4" />
              </span>
            </button>
            <div className="flex flex-col items-center justify-center p-8">
              <Image
                src="/logo.png"
                alt="Astra AI Logo"
                width={130}
                height={130}
                className="mb-4"
              />
              <h2 className="text-2xl font-semibold text-center">
                Visit Cards
              </h2>
            </div>

            <div className="flex flex-col items-center mt-8 max-w-3xl w-11/12 md:w-full">
              <h1 className="text-4xl md:text-6xl lg:textxl md:!leading-snug font-semibold text-center bg-clip-text bg-gradient-to-b from-gray-50 to-gray-50 text-transparent">
                A Link That's Rich, Beautiful, and{" "}
                <span className="text-[#009EE4]">You</span>.
              </h1>
              <p className="text-base md:text-xl text-foreground/80 mt-6 text-center">
                A smarter way to share who you are, what you do, and everything
                you create.
              </p>
              <div className="flex flex-col items-center justify-center mt-8 md:mt-12 w-full">
                <Link href="/sign-up">
                  <Button className="rounded-full text-lg px-6 py-3 font-medium">
                    Create Your Visit Card
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link
                  href="/sign-in"
                  className="mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  Login
                </Link>
              </div>
            </div>

            <div className="relative flex items-center py-10 md:py-20 w-full">
              <div className="absolute top-1/2 left-1/2 -z-10 gradient w-3/4 -translate-x-1/2 h-3/4 -translate-y-1/2 inset-0 blur-[10rem]"></div>
              <div className="-m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl">
                <Image
                  src="/assets/dashboard.svg"
                  alt="Dashboard preview"
                  width={1200}
                  height={1200}
                  quality={100}
                  className="rounded-md lg:rounded-xl bg-foreground/10 shadow-2xl ring-1 ring-border"
                />

                <BorderBeam size={250} duration={12} delay={9} />
              </div>
            </div>
          </div>
        </Container>
      </Wrapper>

      {/* how it works */}
      <Wrapper className="flex flex-col items-center justify-center py-12 relative">
        <Container>
          <div className="max-w-md mx-auto text-start md:text-center">
            <SectionBadge title="The Process" />
            <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
              Build Your Digital Identity in 3 Simple Steps
            </h2>
            <p className="text-muted-foreground mt-6">
              Create, customize, and share your NFC-enabled digital card
              effortlessly.
            </p>
          </div>
        </Container>
        <Container>
          <div className="flex flex-col items-center justify-center py-10 md:py-20 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full divide-x-0 md:divide-x divide-y md:divide-y-0 divide-gray-900 first:border-l-2 lg:first:border-none first:border-gray-900">
              {perks.map((perk) => (
                <div
                  key={perk.title}
                  className="flex flex-col items-start px-4 md:px-6 lg:px-8 lg:py-6 py-4"
                >
                  <div className="flex items-center justify-center">
                    <perk.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-medium mt-4">{perk.title}</h3>
                  <p className="text-muted-foreground mt-2 text-start lg:text-start">
                    {perk.info}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Wrapper>

      {/* features */}
      <Wrapper className="flex flex-col items-center justify-center py-12 relative">
        <div className="hidden md:block absolute top-0 -right-1/3 w-72 h-72 bg-[#009EE4] rounded-full blur-[10rem] -z-10"></div>
        <div className="hidden md:block absolute bottom-0 -left-1/3 w-72 h-72 bg-indigo-600 rounded-full blur-[10rem] -z-10"></div>
        <Container>
          <div className="max-w-md mx-auto text-start md:text-center">
            <SectionBadge title="Features" />
            <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
              Everything You Need in One Digital Card
            </h2>
            <p className="text-muted-foreground mt-6">
              Explore powerful features designed to enhance your networking
              experience.
            </p>
          </div>
        </Container>
        <Container>
          <div className="flex items-center justify-center mx-auto mt-8">
            <Icons.feature className="w-auto h-80" />
          </div>
        </Container>
        <Container>
          <div className="flex flex-col items-center justify-center py-10 md:py-20 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-start lg:items-start px-0 md:px-0"
                >
                  <div className="flex items-center justify-center">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-medium mt-4">{feature.title}</h3>
                  <p className="text-muted-foreground mt-2 text-start lg:text-start">
                    {feature.info}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Wrapper>

      {/* pricing */}
      <Wrapper className="flex flex-col items-center justify-center py-12 relative">
        <div className="hidden md:block absolute top-0 -right-1/3 w-72 h-72 bg-[#009EE4] rounded-full blur-[10rem] -z-10"></div>
        <Container>
          <div className="max-w-md mx-auto text-start md:text-center">
            <SectionBadge title="Pricing" />
            <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
              Flexible Plans for Every Need
            </h2>
            <p className="text-muted-foreground mt-6">
              Choose the perfect plan to build your NFC-enabled digital
              identity.
            </p>
          </div>
        </Container>
        <Container className="flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full md:gap-8 py-10 md:py-20 flex-wrap max-w-4xl">
            {pricingCards.map((card) => (
              <Card
                key={card.title}
                className={cn(
                  "flex flex-col w-full border-neutral-700",
                  card.title === "Professional" && "border-2 border-primary"
                )}
              >
                <CardHeader className="border-b border-border">
                  <span>{card.title}</span>
                  <CardTitle
                    className={cn(
                      card.title !== "Professional" && "text-muted-foreground"
                    )}
                  >
                    {card.price}
                  </CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-3">
                  {card.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Zap className="w-4 h-4 fill-primary text-primary" />
                      <p>{feature}</p>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="mt-auto">
                  <Link
                    href="#"
                    className={cn(
                      "w-full text-center text-primary-foreground bg-primary p-2 rounded-md text-sm font-medium",
                      card.title !== "Professional" &&
                        "!bg-foreground !text-background"
                    )}
                  >
                    {card.buttonText}
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Container>
      </Wrapper>

      {/* testimonials */}
      <Wrapper className="flex flex-col items-center justify-center py-12 relative">
        <div className="hidden md:block absolute -top-1/4 -left-1/3 w-72 h-72 bg-[#009EE4] rounded-full blur-[10rem] -z-10"></div>
        <Container>
          <div className="max-w-md mx-auto text-start md:text-center">
            <SectionBadge title="Our Customers" />
            <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
              What people are saying
            </h2>
            <p className="text-muted-foreground mt-6">
              See how VisitCards empowers professionals.
            </p>
          </div>
        </Container>
        <Container>
          <div className="py-10 md:py-20 w-full">
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden py-10">
              <Marquee pauseOnHover className="[--duration:20s] select-none">
                {firstRow.map((review) => (
                  <figure
                    key={review.name}
                    className={cn(
                      "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                      "border-zinc-50/[.1] bg-background over:bg-zinc-50/[.15]"
                    )}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <UserIcon className="w-6 h-6" />
                      <div className="flex flex-col">
                        <figcaption className="text-sm font-medium">
                          {review.name}
                        </figcaption>
                        <p className="text-xs font-medium text-muted-foreground">
                          {review.username}
                        </p>
                      </div>
                    </div>
                    <blockquote className="mt-2 text-sm">
                      {review.body}
                    </blockquote>
                  </figure>
                ))}
              </Marquee>
              <Marquee
                reverse
                pauseOnHover
                className="[--duration:20s] select-none"
              >
                {secondRow.map((review) => (
                  <figure
                    key={review.name}
                    className={cn(
                      "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                      "border-zinc-50/[.1] bg-background over:bg-zinc-50/[.15]"
                    )}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <UserIcon className="w-6 h-6" />
                      <div className="flex flex-col">
                        <figcaption className="text-sm font-medium">
                          {review.name}
                        </figcaption>
                        <p className="text-xs font-medium text-muted-foreground">
                          {review.username}
                        </p>
                      </div>
                    </div>
                    <blockquote className="mt-2 text-sm">
                      {review.body}
                    </blockquote>
                  </figure>
                ))}
              </Marquee>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
            </div>
          </div>
        </Container>
      </Wrapper>

  {/* URL preview */}
  <Wrapper className="py-12 md:py-20 relative">
      <Container className="relative z-[999999]">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-center">
            <span className="text-muted-foreground/60 mb-2 sm:mb-0">visitcards.in/</span>
            <WordRotate
              words={rotatingWords}
              className="font-medium text-foreground"
              duration={2000}
              framerProps={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -20 },
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
            />
          </div>
          <Button variant="white" asChild className="mt-6">
            <Link href="/sign-up" className="flex items-center justify-center">
              Create Your Visit Card
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </Container>
    </Wrapper>
    </section>
  );
}
