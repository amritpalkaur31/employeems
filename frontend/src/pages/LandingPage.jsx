import React, { useState, useEffect, useRef } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import {
  FaUsers,
  FaCalendarCheck,
  FaMoneyCheckAlt,
  FaCog,
  FaHeadset,
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaArrowDown,
  FaSmile,
  FaBriefcase,
  FaDollarSign,
  FaCheckCircle,
  FaQuestionCircle,
  FaChevronDown,
} from "react-icons/fa";
import Header from "../components/Header";

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  // Testimonials slider state
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // FAQ accordion state
  const [openFAQ, setOpenFAQ] = useState(null);

  const slides = [
    {
      title: "Empower Your Workforce with EMS",
      desc: "Streamline your workforce management—track attendance, handle payroll, assign departments, approve leaves, and more.",
    },
    {
      title: "Seamless Employee Management",
      desc: "Add, update, and manage employee records with ease, all in one place.",
    },
    {
      title: "Real-time Attendance & Payroll",
      desc: "Get accurate insights into employee performance and generate payroll in one click.",
    },
  ];

  const testimonials = [
    {
      quote:
        "EMS transformed how we manage our team. Attendance and payroll have never been easier!",
      name: "Samantha Lee",
      role: "HR Manager, TechCorp",
    },
    {
      quote:
        "The employee management features save us hours every week. Highly recommend!",
      name: "Rajesh Kumar",
      role: "Operations Head, FinServe",
    },
    {
      quote:
        "Dedicated support and customizable settings make EMS the best solution for workforce management.",
      name: "Lara Smith",
      role: "CEO, RetailGiant",
    },
  ];

  const features = [
    {
      icon: <FaUsers className="text-4xl text-teal-600 mb-3 transition-transform group-hover:scale-110" />,
      title: "Employee Management",
      desc: "Easily add, update, and manage employee records with role-based access.",
    },
    {
      icon: <FaCalendarCheck className="text-4xl text-teal-600 mb-3 transition-transform group-hover:scale-110" />,
      title: "Attendance Tracking",
      desc: "Monitor employee check-in/out and maintain accurate logs.",
    },
    {
      icon: <FaMoneyCheckAlt className="text-4xl text-teal-600 mb-3 transition-transform group-hover:scale-110" />,
      title: "Payroll System",
      desc: "Manage salaries, tax deductions, and generate payslips in one click.",
    },
  ];

  const aboutItems = [
    {
      icon: <FaUsers className="text-4xl text-teal-600 mb-3" />,
      title: "Team Collaboration",
      desc: "Empower your team with seamless collaboration and efficient management.",
    },
    {
      icon: <FaCog className="text-4xl text-teal-600 mb-3" />,
      title: "Customizable Settings",
      desc: "Configure departments, leave policies, payrolls, and more to fit your needs.",
    },
    {
      icon: <FaHeadset className="text-4xl text-teal-600 mb-3" />,
      title: "Dedicated Support",
      desc: "Our support team is here to help you 24/7 with any questions or issues.",
    },
  ];

  const stats = [
    {
      icon: <FaUsers size={36} className="text-teal-700" />,
      value: 1500,
      label: "Employees Managed",
    },
    {
      icon: <FaBriefcase size={36} className="text-teal-700" />,
      value: 320,
      label: "Companies Served",
    },
    {
      icon: <FaDollarSign size={36} className="text-teal-700" />,
      value: 120000,
      label: "Payrolls Processed",
    },
    {
      icon: <FaCheckCircle size={36} className="text-teal-700" />,
      value: 99.9,
      label: "System Uptime (%)",
    },
  ];

  const faqs = [
    {
      question: "Is EMS suitable for small businesses?",
      answer:
        "Yes! EMS scales to fit businesses of all sizes, from startups to large enterprises.",
    },
    {
      question: "Can I customize leave policies?",
      answer:
        "Absolutely. EMS allows you to set up custom leave types and approval workflows.",
    },
    {
      question: "Is employee data secure?",
      answer:
        "We prioritize security using encrypted databases and secure authentication protocols.",
    },
    {
      question: "Does EMS support multi-department management?",
      answer: "Yes, you can create and manage multiple departments easily.",
    },
  ];

  // Slide auto-advance
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, slides.length, testimonials.length]);

  // Animated Stats Counter (basic implementation)
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 2000; // 2 seconds animation
    const startTime = Date.now();

    function animate() {
      const elapsed = Date.now() - startTime;
      if (elapsed < duration) {
        const newCounts = stats.map(({ value }, i) =>
          Math.min(
            value,
            Math.floor((elapsed / duration) * value)
          )
        );
        setCounts(newCounts);
        requestAnimationFrame(animate);
      } else {
        setCounts(stats.map((s) => s.value));
      }
    }
    animate();
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (diffX > 50) handleNext();
    else if (diffX < -50) handlePrev();

    touchStartX.current = null;
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 to-teal-800 text-white">
      <Header />

      {/* Hero Section with Slide */}
      <section
        id="hero"
        className="relative h-[90vh] overflow-hidden flex flex-col items-center justify-center px-6 text-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-teal-800 z-0" />

        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute z-10 max-w-4xl text-center px-4 md:px-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            }`}
            style={{ transition: "opacity 1s ease-in-out, transform 1s ease-in-out" }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg leading-tight">
              {slide.title}
            </h1>
            <p className="max-w-2xl mb-12 text-lg mx-auto">{slide.desc}</p>
            <Link
              to="/login"
              smooth={true}
              duration={500}
              className="bg-white text-teal-700 px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:scale-105 transition-transform cursor-pointer inline-block"
            >
              Get Started
            </Link>
          </div>
        ))}

        {/* Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white text-teal-700 p-3 rounded-full shadow hover:scale-110 transition"
          aria-label="Previous Slide"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white text-teal-700 p-3 rounded-full shadow hover:scale-110 transition"
          aria-label="Next Slide"
        >
          <FaChevronRight size={20} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-20 flex gap-3 justify-center w-full z-10">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                currentSlide === idx ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") setCurrentSlide(idx);
              }}
            />
          ))}
        </div>

        {/* Animated Scroll Indicator */}
        <div
          className="absolute bottom-6 flex flex-col items-center cursor-pointer animate-bounce"
          onClick={() => scroll.scrollTo(document.getElementById("features").offsetTop)}
          aria-label="Scroll down"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter") {scroll.scrollTo(document.getElementById("features").offsetTop) };
        }
        }
        >
          <FaArrowDown size={28} className="text-white" />
          <span className="text-sm mt-1">Scroll down</span>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-28 md:py-36 bg-white text-gray-800"
      >
        <h2 className="text-4xl font-bold text-center mb-16 text-teal-700">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto px-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-lg bg-gray-100 shadow-lg text-center group transition-transform hover:scale-105 hover:shadow-2xl"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-700">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-teal-50 text-teal-900">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>

        <div className="max-w-3xl mx-auto relative px-6">
          {/* Testimonial Card */}
          <div className="bg-white rounded-lg shadow-lg p-10 text-center relative">
            <FaQuoteLeft size={36} className="text-teal-600 mb-6 mx-auto" />
            <p className="italic text-lg mb-6">"{testimonials[testimonialIndex].quote}"</p>
            <h4 className="font-semibold text-xl">{testimonials[testimonialIndex].name}</h4>
            <p className="text-sm text-teal-700">{testimonials[testimonialIndex].role}</p>

            {/* Nav Arrows */}
            <button
              onClick={() =>
                setTestimonialIndex(
                  (testimonialIndex - 1 + testimonials.length) % testimonials.length
                )
              }
              aria-label="Previous Testimonial"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700 transition"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() =>
                setTestimonialIndex((testimonialIndex + 1) % testimonials.length)
              }
              aria-label="Next Testimonial"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700 transition"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gradient-to-tr from-teal-800 to-teal-700 text-white">
  <h2 className="text-4xl font-bold text-center mb-16">About EMS</h2>
  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 px-6">
    {aboutItems.map((item, idx) => (
      <div
        key={idx}
        className="text-center text-teal-600 bg-teal-50 bg-opacity-30 rounded-lg p-6"
      >
        {item.icon}
        <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
        <p className="max-w-md mx-auto">{item.desc}</p>
      </div>
    ))}
  </div>
</section>

      {/* Stats Section */}
      <section className="py-20 bg-white text-teal-900">
        <h2 className="text-4xl font-bold text-center mb-16">Our Impact</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12 px-6 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              {stat.icon}
              <span className="text-5xl font-extrabold mt-4">
                {counts[idx]}{stat.label.includes("%") ? "%" : ""}
              </span>
              <p className="text-lg mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 bg-teal-700 text-white text-center px-6"
        id="cta"
      >
        <h2 className="text-4xl font-extrabold mb-6">
          Ready to Simplify Your Workforce Management?
        </h2>
        <p className="max-w-xl mx-auto mb-8 text-lg">
          Join thousands of companies who trust EMS for efficient employee management.
        </p>
        <Link
          to="/login"
          smooth={true}
          duration={500}
          className="inline-block bg-white text-teal-700 font-bold py-3 px-10 rounded-full shadow-lg hover:scale-105 transition-transform cursor-pointer"
        >
          Get Started Now
        </Link>
      </section>

      {/* FAQ Section */}
      <section
        className="py-24 bg-white text-gray-800 max-w-4xl mx-auto px-6"
        id="faq"
      >
        <h2 className="text-4xl font-bold text-center mb-16 text-teal-700">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-300 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full flex justify-between items-center p-5 bg-teal-50 text-teal-800 font-semibold hover:bg-teal-100 transition"
                aria-expanded={openFAQ === idx}
                aria-controls={`faq-panel-${idx}`}
              >
                {faq.question}
                <FaChevronDown
                  className={`transform transition-transform duration-300 ${
                    openFAQ === idx ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              <div
                id={`faq-panel-${idx}`}
                className={`px-5 pb-5 transition-max-height duration-500 ease-in-out overflow-hidden ${
                  openFAQ === idx ? "max-h-96" : "max-h-0"
                }`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-900 text-teal-300 py-6 text-center">
        &copy; {new Date().getFullYear()} EMS. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
