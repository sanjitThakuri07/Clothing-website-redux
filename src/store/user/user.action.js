import { USER_ACTION_TYPES } from "./user.types";

import { CreateAction } from "../../utils/reducer/reducer.utils";

export const setCurrentUser = (user) =>
  CreateAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
