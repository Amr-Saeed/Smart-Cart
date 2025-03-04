import "./style.css";
import { useState } from "react";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
  },
  {
    title: "How long do I have to return my chair?",
    text:
      "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
  },
  {
    title: "Do you ship to countries outside the EU?",
    text:
      "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
  }
];

export default function App() {
  return (
    <div>
      <Accordion />
    </div>
  );
}

function Accordion() { //here we passed this faqs as props just if we need to reuse the accordion with different arrays
  const [curOpen, setCurOpen] = useState(null);

  return <div className="accordion">
    {faqs.map((ele, i) => <AcoordionItem curOpen={curOpen} onOpen={setCurOpen} obj={ele} num={i + 1} key={i} > {ele.text} </AcoordionItem>)}

    <AcoordionItem obj={{ title: "test" }} curOpen={curOpen} onOpen={setCurOpen} num={55} key='55' > <p>anything i want</p> </AcoordionItem>
  </div>;
}

function AcoordionItem({ obj, num, curOpen, onOpen, children }) {
  const isOpen = num === curOpen;
  // const [isOpen, setIsOpen] = useState(false);
  function handleToogle() {
    // setIsOpen(isOpen => !isOpen);

    // onOpen(num);

    onOpen(isOpen ? null : num);
  }

  return <div className={`item ${isOpen && "open"}`} onClick={handleToogle}>   {/* here i wanna put two classes one named item which responsible for 
    styling the boxes themselves in the div like how they placed and how they appear and so on
    the other is for if the box is open or closed like if it opened we must make the border green so
    by this way we implement a two calsses one will be always true and the other will wotk on a condition */}

    <span className="number">{num < 9 ? `0${num}` : num}</span>
    <p className="title">{obj.title}</p>
    <p className="icon">{isOpen ? "-" : "+"}</p>
    {isOpen && <div className="content-box">{children}</div>}
  </div>
}
