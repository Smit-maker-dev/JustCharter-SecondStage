import { Helmet } from 'react-helmet-async';
import {
  Clock,
  Plane,
  HeartPulse,
  MessageSquare,
  ArrowRight,
  MapPin,
  Calendar,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

// Mock data for history
const historyItems = [
  {
    id: "req_1084",
    type: "flight",
    status: "confirmed",
    date: "2026-05-15",
    details: {
      from: "New York (TEB)",
      to: "London (FAB)",
      aircraft: "Bombardier Global 7500",
      passengers: 4,
      departureTime: "09:00 AM EST",
    },
    requestedOn: "2026-05-01",
  },
  {
    id: "req_1083",
    type: "ambulance",
    status: "completed",
    date: "2026-03-22",
    details: {
      patient: "Jane Doe",
      from: "Aspen, CO",
      to: "Mayo Clinic, MN",
      condition: "Post-surgery transport",
    },
    requestedOn: "2026-03-21",
  },
  {
    id: "req_1082",
    type: "inquiry",
    status: "replied",
    date: "2026-02-10",
    details: {
      subject: "Yacht Charter Ibiza",
      message:
        "Interested in the 7-day Mediterranean yacht charter starting mid-July.",
    },
    requestedOn: "2026-02-09",
  },
  {
    id: "req_1081",
    type: "flight",
    status: "cancelled",
    date: "2025-11-28",
    details: {
      from: "Miami (OPF)",
      to: "Aspen (ASE)",
      aircraft: "Cessna Citation Latitude",
      passengers: 6,
      departureTime: "10:30 AM EST",
    },
    requestedOn: "2025-11-15",
  },
];

export default function History() {
  const [filter, setFilter] = useState("all");

  const filteredItems = historyItems.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
      case "completed":
        return "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 border-green-200 dark:border-green-500/30";
      case "replied":
        return "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30";
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-500/30";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-white/70 border-gray-200 dark:border-white/20";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "flight":
        return <Plane className="w-5 h-5" />;
      case "ambulance":
        return <HeartPulse className="w-5 h-5" />;
      case "inquiry":
        return <MessageSquare className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "flight":
        return "bg-black text-white dark:bg-white dark:text-black";
      case "ambulance":
        return "bg-red-600 text-white";
      case "inquiry":
        return "bg-blue-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  return (
<div className="pt-24 md:pt-32 min-h-screen">
<Helmet><title>Our History | JustCharter Aviation Heritage</title><meta name="description" content="Our History | JustCharter Aviation Heritage" /><script type="application/ld+json">{`{ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://just-charter-second-stage.vercel.app/" }, { "@type": "ListItem", "position": 2, "name": "History", "item": "https://just-charter-second-stage.vercel.app/history" }]}`}</script></Helmet>
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 mb-12 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <h1
              className="text-4xl md:text-5xl lg:text-7xl font-medium mb-4 tracking-tight"
              style={{ letterSpacing: "-0.04em" }}
            >
              Your History
            </h1>
            <p className="text-black/60 dark:text-white/60 text-lg md:text-xl max-w-2xl">
              Track your past flights, medical transports, and inquiries all in
              one place.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { id: "all", label: "All Requests" },
            { id: "flight", label: "Flights" },
            { id: "ambulance", label: "Air Ambulance" },
            { id: "inquiry", label: "Inquiries" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                filter === f.id
                  ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-sm"
                  : "bg-transparent text-black/70 border-gray-200 hover:border-black/30 dark:text-white/70 dark:border-white/10 dark:hover:border-white/30"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* History List */}
        <div className="space-y-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Left Col: Icon & Date */}
                <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:w-48 shrink-0 border-b md:border-b-0 md:border-r border-gray-100 dark:border-white/5 pb-4 md:pb-0 md:pr-6">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${getTypeColor(item.type)}`}
                  >
                    {getTypeIcon(item.type)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-black/50 dark:text-white/50 mb-1">
                      Date
                    </p>
                    <p className="font-medium text-lg">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Middle Col: Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-medium mb-2 capitalize">
                        {item.type === "flight"
                          ? "Private Charter"
                          : item.type === "ambulance"
                            ? "Medical Transport"
                            : "General Inquiry"}
                      </h3>
                      <p className="text-sm text-black/50 dark:text-white/50 font-mono">
                        ID: {item.id} • Requested on{" "}
                        {new Date(item.requestedOn).toLocaleDateString()}
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${getStatusColor(item.status)}`}
                    >
                      {item.status}
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-white/5 rounded-2xl p-5">
                    {item.type === "flight" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-black/40 dark:text-white/40 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-black/50 dark:text-white/50 font-semibold uppercase tracking-wider mb-1">
                              Route
                            </p>
                            <p className="font-medium">
                              {item.details.from}{" "}
                              <ArrowRight className="inline w-3 h-3 mx-1" />{" "}
                              {item.details.to}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Plane className="w-5 h-5 text-black/40 dark:text-white/40 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-black/50 dark:text-white/50 font-semibold uppercase tracking-wider mb-1">
                              Aircraft
                            </p>
                            <p className="font-medium">
                              {item.details.aircraft}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-black/40 dark:text-white/40 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-black/50 dark:text-white/50 font-semibold uppercase tracking-wider mb-1">
                              Departure
                            </p>
                            <p className="font-medium">
                              {item.details.departureTime}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {item.type === "ambulance" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-red-500/60 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-black/50 dark:text-white/50 font-semibold uppercase tracking-wider mb-1">
                              Route
                            </p>
                            <p className="font-medium">
                              {item.details.from}{" "}
                              <ArrowRight className="inline w-3 h-3 mx-1 text-red-500/50" />{" "}
                              {item.details.to}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Activity className="w-5 h-5 text-red-500/60 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-black/50 dark:text-white/50 font-semibold uppercase tracking-wider mb-1">
                              Patient Condition
                            </p>
                            <p className="font-medium">
                              {item.details.condition}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {item.type === "inquiry" && (
                      <div>
                        <p className="text-xs text-black/50 dark:text-white/50 font-semibold uppercase tracking-wider mb-1">
                          Subject: {item.details.subject}
                        </p>
                        <p className="text-black/80 dark:text-white/80 mt-2">
                          {item.details.message}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-gray-50 dark:bg-neutral-900 rounded-3xl border border-gray-100 dark:border-white/5">
              <Clock className="w-12 h-12 text-black/20 dark:text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No history found</h3>
              <p className="text-black/50 dark:text-white/50 mb-6">
                You don't have any requests in this category yet.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-full font-medium hover:bg-black/90 dark:hover:bg-white/90 transition-colors"
              >
                Book a Flight
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
