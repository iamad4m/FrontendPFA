import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TouristsCards = ({ tourists }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <>
      <h1 className="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-indigo-600  dark:text-gray-200 mx-5 mb-3">
        Tourists
      </h1>
      <div className="ml-20 mr-20">
        <Slider {...settings}>
          {tourists.map((tourist) => (
            <div className="w-full sm:w-1/4 md:w-1/4 mb-4 px-2">
              <div className="bg-white shadow-xl border border-gray-200 rounded-lg py-3">
                <div className="photo-wrapper p-2">
                  <img
                    className="w-32 h-32 rounded-full mx-auto bg-gray-200 border-2 border-indigo-600"
                    src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${tourist.email}&radius=50&size=50&backgroundType=gradientLinear`}
                    alt={`${tourist.firstName} ${tourist.lastName}`}
                  />
                </div>
                <div className="p-2">
                  <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                    {tourist.firstName} {tourist.lastName}
                  </h3>
                  <div className="text-center text-gray-400 text-xs font-semibold">
                    <p>Tourist</p>
                  </div>
                  <table className="text-xs my-3 flex items-center justify-center">
                    <tbody>
                      <tr>
                        <td className="px-2 py-2 text-gray-500 font-semibold">
                          Email
                        </td>
                        <td className="px-2 py-2">{tourist.email}</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-2 text-gray-500 font-semibold">
                          Phone
                        </td>
                        <td className="px-2 py-2">{tourist.phoneNumber}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex justify-center mt-4">
                    <button
                      className="border border-red-500 text-red-500 px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-red-500 hover:text-white"
                      onClick={() => console.log(tourist.id)}
                    >
                      Blacklist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default TouristsCards;
