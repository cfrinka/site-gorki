import { useEffect, useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { useSiteDataContext } from "@/context/SiteDataContext";
import { Link } from "react-router-dom";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer";
import Checkout from "@/pages/Checkout";

interface EventData {
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
}

const UpcomingEvents = () => {
  const { siteData, loading } = useSiteDataContext();
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    if (siteData?.home?.nextEvents) {
      // Sort events from closest to furthest away
      const sortedEvents = [...siteData.home.nextEvents].sort((a, b) => {
        const parse = (str: string) => {
          if (!str || str.trim() === "") return new Date(9999, 11, 31); // Put empty dates at the end
          const [d, m, y] = str.split("-").map(Number);
          if (isNaN(d) || isNaN(m) || isNaN(y)) return new Date(9999, 11, 31); // Invalid dates at the end
          return new Date(y, m - 1, d);
        };
        const dateA = parse(a.date);
        const dateB = parse(b.date);
        return dateA.getTime() - dateB.getTime();
      });
      setEvents(sortedEvents);
    }
  }, [siteData]);

  if (loading) {
    return (
      <div className="w-full py-8 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2 text-gray-600">Carregando eventos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-8 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Próximos Eventos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 relative">
                  <div className="absolute top-2 left-2 z-10">
                    <span className="bg-yellow-500 text-black text-xs font-semibold px-3 py-2 rounded-full shadow-md">
                      {event.date}
                    </span>
                  </div>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6 flex flex-col h-full">
                    <h3 className="text-xl font-semibold mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-2 flex-1">
                      {event.description}
                    </p>
                    <div className="flex justify-between items-end text-sm text-gray-500 mt-2">
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-2xl p-0 bg-white rounded-3xl shadow-2xl border-0 overflow-hidden">
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-64 object-cover rounded-t-3xl shadow-md"
                  />
                  <span className="absolute top-4 left-4 bg-yellow-500 text-black text-xs font-semibold px-4 py-2 rounded-full shadow-md z-10">
                    {event.date}
                  </span>
                </div>
                <div className="p-8 flex flex-col gap-4">
                  <h3 className="text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <span className="inline-flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6 2a1 1 0 00-1 1v1H5a3 3 0 00-3 3v8a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm8 5a1 1 0 011 1v8a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h10z" />
                      </svg>
                      {event.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm0-9a3 3 0 100 6 3 3 0 000-6z" />
                      </svg>
                      {event.location}
                    </span>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    {event.description}
                  </p>
                  <div className="flex justify-end">
                    <Drawer>
                      <DrawerTrigger asChild>
                        <button className="bg-yellow-500 text-black font-bold px-6 py-3 rounded-full shadow hover:bg-yellow-700 transition-colors duration-200 text-base">
                          Comprar Ingresso
                        </button>
                      </DrawerTrigger>
                      <DrawerContent className="max-w-lg ml-auto h-full fixed right-0 top-0 rounded-none rounded-l-2xl shadow-2xl p-0 overflow-y-auto">
                        <DrawerClose className="absolute top-4 right-4 z-10 text-black rounded-full p-2 transition-colors">
                          <span className="text-3xl">&times;</span>
                        </DrawerClose>
                        <Checkout />
                      </DrawerContent>
                    </Drawer>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
