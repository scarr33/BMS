import { Types } from "mongoose";
import { generateSeatLayout, groupShowsByTheatreAndMovie } from "../../utils";
import { IShow } from "./show.interface";
import { ShowModel } from "./show.model";

export const createShow = async (showData: IShow) => {
  const seatLayout = generateSeatLayout();
  const showToCreate = { ...showData, seatLayout };

  return await ShowModel.create(showToCreate);
};

export const getShowsByMovieDateLocation = async (
  movieId: string,
  date: string,
  location: string,
) => {
  const query: any = {
    movie: new Types.ObjectId(movieId),
    location: { $regex: new RegExp(location, "i") },
  };
  if (date) {
    query.date = date;
  }
  const shows = await ShowModel.find(query)
    .populate("movie theater")
    .sort({ startTime: 1 });

  const groupedShows = groupShowsByTheatreAndMovie(shows);

  return groupedShows;
};

export const getShowById = async (showId: string) => {
  return await ShowModel.findById(showId).populate("movie theater");
};

export const updateSeatStatus = async (
  showId: string,
  row: string,
  seatNumber: number,
  status: "AVAILABLE" | "BOOKED" | "BLOCKED",
) => {
  return await ShowModel.updateOne(
    {
      _id: new Types.ObjectId(showId),
      "seatLayout.row": row,
    },
    {
      $set: {
        "seatLayout.$.seats.$[elem].status": status,
      },
    },
    {
      arrayFilters: [{ "elem.number": seatNumber }],
    },
  );
};
