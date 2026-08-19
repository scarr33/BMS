import { ITheater } from "./theater.interface";
import { TheaterModel } from "./theater.model";

export const createTheater = async (data: ITheater): Promise<ITheater> => {
  return await TheaterModel.create(data);
};

export const getAllTheaters = async (): Promise<ITheater[]> => {
  return await TheaterModel.find();
};

export const getTheaterById = async (id: string): Promise<ITheater | null> => {
  return await TheaterModel.findById(id);
};

export const getTheaterByState = async (state: string): Promise<ITheater[]> => {
  return await TheaterModel.find({ state: { $regex: state, $options: "i" } }); // regex will search for state and i represents that it is case insensetive
};
