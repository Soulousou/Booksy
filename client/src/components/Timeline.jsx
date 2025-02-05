import React, { Fragment } from 'react';


const Timeline = ({ tools }) => {

    return (
      <div className="flex flex-col gap-y-3 w-full my-4 poppins-light">
        <Circle />
  
        {tools.map((tool, key) => (

           <Fragment key={key}>
            <div className="grid grid-cols-[1fr_auto_1fr] gap-x-2 items-center mx-auto">
              {tool.direction === "left" ? (
                <EventCard heading={tool.heading} subheading={tool.subheading} />
              ) : (
                <div></div>
              )}
  
              <Pillar />
  
              {tool.direction === "right" ? (
                <EventCard heading={tool.heading} subheading={tool.subheading} />
              ) : (
                <div></div>
              )}
            </div>
  
            {key < tools.length - 1 && <Circle />}
          </Fragment>

        ))}
  
        <Circle />
      </div>
    );
  };


const Circle = () => {

    return (
        <div className='rounded-full w-4 h-4 mx-auto bg-gradient-to-r from-accentgreen to-greygreen'> 

        </div>
    )
}

const Pillar = () => {

    return (
        <div className='rounded-t-full rounded-b-full w-2 h-full bg-gradient-to-b from-accentgreen to-greygreen mx-auto'> 

        </div>
    )
}

const EventCard = ({ heading, subheading }) => {
    return (
      <div className="transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl flex flex-col gap-y-2 border border-accentgreen shadow-md rounded-xl p-4">
        <div className="">{heading}</div>
        <div className="text-accentgreen text-m">{subheading}</div>
      </div>
    );
  };

export default Timeline;
