import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";

const colours = ["from-indigo-500", "from-blue-500", "from-purple-500"];

export default function Center() {
  const { data: session } = useSession();
  const image =
    session?.user?.image ??
    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80";
  const [colour, setColor] = useState(null);

  useEffect(() => {
    setColor(shuffle(colours)[0]);
  }, []);

  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex items-center p-1 pr-2 space-x-3 text-white bg-black rounded-full cursor-pointer opacity-90 hover:opacity-80">
          <img
            src={image}
            className="object-cover w-10 h-10 rounded-full"
            alt="user image"
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${colour} h-80 text-white p-8`}
      ></section>
    </div>
  );
}
