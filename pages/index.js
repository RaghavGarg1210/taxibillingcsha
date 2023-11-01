import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });
import { RxCross1 } from "react-icons/rx";

export default function Home() {
  const [custName, setcustName] = useState("");
  const [date, setDate] = useState("");
  const [distanceOfJourney, setDistanceOfJourney] = useState(0);
  const [acType, setacType] = useState("");
  const [carType, setcarType] = useState("");
  const [journeyType, setjourneyType] = useState("");
  const [isModal, setisModal] = useState(false);
  const [totalBill, settotalBill] = useState(0);

  const toggleIsModalFalse = () => {
    setisModal(false);
    setcustName("");
    setDate("");
    setDistanceOfJourney("");
    setacType("");
    setcarType("");
    setjourneyType("");
  };
  const generateBill = () => {
    console.log(custName,
    date,
    distanceOfJourney,
    acType,
    carType,
    journeyType)
    console.log(typeof( distanceOfJourney))

    if (
      custName != "" &&
      date != "" &&
      distanceOfJourney != 0 &&
      acType != "" &&
      carType != "" &&
      journeyType != ""
    ) {
      const baseRate = {
        Micro: { AC: 50, nonAC: 30,upto10:6, next20:5,afterthat:4  },
        Mini: { AC: 80, nonAC: 60,upto10:7, next20:6,afterthat:5  },
        Sedan: { AC: 150, nonAC: 100,upto10:8.5, next20:7,afterthat:6  },
        XUV: { AC: 250, nonAC: 150,upto10:10, next20:8,afterthat:7  },
      };
      let total = 0;
      if (journeyType === "Outstation") {
        if (carType=="XUV"){
          total+=100
        }
        else if (carType=="Sedan"){
          total+=80
        }
      }
      console.log(baseRate[carType][acType])
      total+=baseRate[carType][acType]

      if (distanceOfJourney <= 10) {
        total += distanceOfJourney * baseRate[carType].upto10;
      } else if (distanceOfJourney <= 30) {
        total +=
          10 * baseRate[carType].upto10 + (distanceOfJourney - 10) * baseRate[carType].next20;
      } else {
        total +=
          10 * baseRate[carType].upto10 +
          20 * baseRate[carType].next20 +
          (distanceOfJourney - 30) * baseRate[carType].afterthat;
      }

      settotalBill(total);
      setisModal(true);
    }
  };
  return (
    <div className="bg-gradient-to-tr py-12 from-blue-300 to-cyan-300 h-screen relative">
      {!isModal && (
        <div className="mx-auto shadow-xl w-11/12 md:w-1/2 rounded-md bg-white text-center py-4 px-4">
          <div className="text-4xl font-bold text-blue-600">Taxi Billing</div>
          <form>
            <div className=" p-4">
              <label
                className="font-bold text-base flex items-center mr-8"
                htmlFor="customer-name"
              >
                Enter Customer's Name:
              </label>
              <input
                className="px-2 h-10 rounded-sm shadow-[0_0px_5px_0px_rgba(0,0,0,0.1)] w-full"
                type="text"
                onChange={(e) => setcustName(e.target.value)}
                required
              />
            </div>

            <div className=" p-4">
              <label
                className=" text-base font-bold flex items-center mr-8"
                htmlFor="date"
              >
                Date of travel:
              </label>
              <input
                className="px-2 h-10 rounded-sm shadow-[0_0px_5px_0px_rgba(0,0,0,0.1)] w-full"
                type="date"
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className=" p-4">
              <label
                className=" text-base font-bold flex items-center mr-8"
                htmlFor="customer-name"
              >
                Distance travelled:
              </label>
              <input
                className="px-2 h-10 rounded-sm shadow-[0_0px_5px_0px_rgba(0,0,0,0.1)] w-full"
                placeholder="in km"
                type="number"
                onChange={(e) => setDistanceOfJourney(e.target.value)}
                required
              />
            </div>

            <div className="flex px-4 py-2">
              <label
                className=" text-base font-bold flex items-center mr-8"
                htmlFor="customer-name"
              >
                Type of car:
              </label>
              <div className="mx-2">
                <input
                  type="radio"
                  name="Car"
                  value="Micro"
                  required
                  className="mr-1"
                  onChange={(e) => setcarType("Micro")}
                />{" "}
                Micro
              </div>
              <div className="mx-2">
                <input
                  type="radio"
                  name="Car"
                  value="Mini"
                  className="mr-1"
                  onChange={(e) => setcarType("Mini")}
                />{" "}
                Mini
              </div>
              <div className="mx-2">
                <input
                  type="radio"
                  name="Car"
                  value="Sedan"
                  className="mr-1"
                  onChange={(e) => setcarType("Sedan")}
                />{" "}
                Sedan
              </div>
              <div className="mx-2">
                <input
                  type="radio"
                  name="Car"
                  value="XUV"
                  className="mr-1"
                  onChange={(e) => setcarType("XUV")}
                />{" "}
                XUV
              </div>
            </div>

            <div className="flex px-4 py-2">
              <label
                className=" text-base font-bold flex items-center mr-8"
                htmlFor="customer-name"
              >
                Air Conditioning:
              </label>
              <div className="mx-2">
                <input
                  type="radio"
                  name="ac"
                  value="AC"
                  className="mr-1"
                  onChange={(e) => setacType("AC")}
                  required
                />{" "}
                AC
              </div>
              <div className="mx-2">
                <input
                  type="radio"
                  name="ac"
                  value="nonAC"
                  className="mr-1"
                  onChange={(e) => setacType("nonAC")}
                />{" "}
                Non AC
              </div>
            </div>
            <div className="flex px-4 py-2">
              <label
                className=" text-base font-bold flex items-center mr-8"
                htmlFor="customer-name"
              >
                Type of Journey:
              </label>
              <div className="mx-2">
                <input
                  type="radio"
                  name="Journey"
                  value="Outstation"
                  className="mr-1"
                  disabled={carType !== "XUV" && carType !== "Sedan"}
                  onChange={(e) => setjourneyType("Outstation")}
                  required
                />{" "}
                Outstation
              </div>
              <div className="mx-2">
                <input
                  required
                  type="radio"
                  name="Journey"
                  value="Local"
                  className="mr-1"
                  onChange={(e) => setjourneyType("Local")}
                />
                Local
              </div>
            </div>
            <button
              className="bg-blue-500 px-4 py-2 my-10 text-white font-medium rounded-xl cursor-pointer"
              type="submit"
              onClick={generateBill}
            >
              Generate Bill
            </button>
          </form>
        </div>
      )}
      {isModal && (
        <div className="h-full">
          <div className=" mx-auto shadow-xl w-11/12 md:w-1/2 rounded-md bg-white text-center py-4 px-4">
            <div className="text-4xl mb-4 font-bold text-blue-600">
              Your bill
            </div>

            <div className="flex px-4 py-2">
              <p
                className=" text-base font-bold flex items-center mr-8"
                htmlFor="customer-name"
              >
                Customer Name:
              </p>
              <div>{custName}</div>
            </div>

            <div className="flex px-4 py-2">
              <p
                className=" text-base font-bold flex items-center mr-8"
                htmlFor="customer-name"
              >
                Date of Travel:
              </p>
              <div>{date}</div>
            </div>

            <div className="flex px-4 py-2">
              <p
                className=" text-base font-bold flex items-center mr-8"
                htmlFor="customer-name"
              >
                Type of Car:
              </p>
              <div>{carType}</div>
            </div>

            <div className="flex px-4 py-2">
              <p
                className=" text-base font-bold flex items-center mr-8"
                htmlFor="customer-name"
              >
                Type of Journey:
              </p>
              <div>{journeyType}</div>
            </div>

            <div className="flex px-4 py-2">
              <p
                className=" text-base font-bold flex items-center mr-8"
                htmlFor="customer-name"
              >
                Distance of Your Journey:
              </p>
              <div>{distanceOfJourney}</div>
            </div>
            <div className="flex px-4 py-2">
              <p
                className=" text-base font-bold flex items-center mr-8"
                htmlFor="customer-name"
              >
                AC Type:
              </p>
              <div>{acType}</div>
            </div>

            <div className="flex px-4 py-2">
              <p
                className=" text-base font-bold flex items-center mr-8"
                htmlFor="customer-name"
              >
                Total Bill:
              </p>
              <div>{totalBill}</div>
            </div>

            <button
              className="bg-blue-500 px-4 py-2 my-10 text-white font-medium rounded-xl cursor-pointer"
              onClick={toggleIsModalFalse}
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
