import { create } from "zustand";

export type UserDto = {
  user_id: number;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  utm: string | null;
  rule: boolean;
  subs: boolean;
  created_at: string;
};

export type WinnerDto = {
  place: number;
  prize: string;
  user_id: number;
  username: string | null;
  first_name: string | null;
};

export type ResultDto = {
  genre: string;
  genre_display: string;
  title: string;
  text: string;
  image: string | null;
};

export type AnswerDto = {
  id: number;
  text: string;
  logo: string | null;
};

export type QuestionDto = {
  id: number;
  text: string;
  image: string | null;
  order: number;
  answers: AnswerDto[];
};

export type LocationProgressDto = {
  location: string;
  is_success: boolean;
  attempts: number;
};

export type GetUserDataResponse = {
  user: UserDto | null;
  winners?: WinnerDto[];
  last_result?: ResultDto | null;

  /**
   * Оставлено для обратной совместимости, если старый бэк/эндпоинт
   * где-то ещё возвращает locations.
   */
  locations?: LocationProgressDto[];
};

export type GetQuestionsResponse = QuestionDto[];

export type SubmitAnswersPayload = {
  user_id: number;
  answers: number[];
};

export type SubmitAnswersResponse = ResultDto;

type AppStateData = {
  user: UserDto | null;
  locations: LocationProgressDto[];
  winners: WinnerDto[];
  questions: QuestionDto[];

  lastResult: ResultDto | null;
  finalResponse: ResultDto | null;

  isHydrated: boolean;
  selectedAnswersByQuestion: Record<number, number>;
  isRoamingPopupOpen: boolean;
};

type AppStateActions = {
  setUser: (user: UserDto | null) => void;
  setUserSubs: (subs: boolean) => void;
  setUserRule: (rule: boolean) => void;

  setLocations: (locations: LocationProgressDto[]) => void;
  setWinners: (winners: WinnerDto[]) => void;
  setQuestions: (questions: QuestionDto[]) => void;

  setLastResult: (result: ResultDto | null) => void;
  setFinalResponse: (result: ResultDto | null) => void;

  upsertLocationProgress: (location: string, isSuccess: boolean) => void;

  hydrateFromServer: (data: GetUserDataResponse) => void;

  setAnswer: (questionId: number, answerId: number) => void;
  resetTestProgress: () => void;

  reset: () => void;
  setIsRoamingPopupOpen: (isOpen: boolean) => void;
};

type AppState = AppStateData & AppStateActions;

const initialState: AppStateData = {
  user: null,
  locations: [],
  winners: [],
  questions: [],

  lastResult: null,
  finalResponse: null,

  isHydrated: false,
  selectedAnswersByQuestion: {},
  isRoamingPopupOpen: false,
};

export const useAppStore = create<AppState>((set) => ({
  ...initialState,

  setUser: (user) =>
    set({
      user,
    }),

  setUserSubs: (subs) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            subs,
          }
        : null,
    })),

  setUserRule: (rule) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            rule,
          }
        : null,
    })),

  setLocations: (locations) =>
    set({
      locations,
    }),

  setWinners: (winners) =>
    set({
      winners,
    }),

  setQuestions: (questions) =>
    set({
      questions,
    }),

  setLastResult: (result) =>
    set({
      lastResult: result,
    }),

  setFinalResponse: (result) =>
    set({
      finalResponse: result,
      lastResult: result,
    }),

  upsertLocationProgress: (location, isSuccess) =>
    set((state) => {
      const currentLocation = state.locations.find(
        (item) => item.location === location,
      );

      if (!currentLocation) {
        return {
          locations: [
            ...state.locations,
            {
              location,
              is_success: isSuccess,
              attempts: 1,
            },
          ],
        };
      }

      return {
        locations: state.locations.map((item) =>
          item.location === location
            ? {
                ...item,
                is_success: item.is_success || isSuccess,
                attempts: item.attempts + 1,
              }
            : item,
        ),
      };
    }),

  hydrateFromServer: (data) =>
    set({
      user: data.user ?? null,
      locations: Array.isArray(data.locations) ? data.locations : [],
      winners: Array.isArray(data.winners) ? data.winners : [],
      lastResult: data.last_result ?? null,
      finalResponse: data.last_result ?? null,
      isHydrated: true,
      selectedAnswersByQuestion: {},
    }),

  setAnswer: (questionId, answerId) =>
    set((state) => ({
      selectedAnswersByQuestion: {
        ...state.selectedAnswersByQuestion,
        [questionId]: answerId,
      },
    })),

  resetTestProgress: () =>
    set({
      selectedAnswersByQuestion: {},
      finalResponse: null,
    }),

  reset: () => set(initialState),
  setIsRoamingPopupOpen: (isOpen) => set({ isRoamingPopupOpen: isOpen }),
}));