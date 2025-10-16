import {
  DASHBOARDCOUNT,
  RENEWAL,
  DASHBOARDMOVIES,
  TOTALUSERS,
  DAILY_REVENUE,
  TOTALSUBSCRIBEUSER,
  MONTHLYREVENUE,
  MAX_LOGIN_DURATION,
  TOTALREVENUE,
  TV_SHOW_DASHBOARD,
  RECENT_SUBSCRIBER_DASHBOARD,
  HIGHESTMOVIECOUNT,
  TOTALREVENUEDIS,
  PRODUCER_MOVIE_GRAPH,
  PRODUCER_MOVIE_LIST,
  ADVERTISEMENT_VIEW_GRAPH,
  CURRENTLY_LOGGED_IN_USERS_BY_STATE_GRAPH,
  REGION_CHART,
  MOST_WATCH_MOVIE
} from "./../constants/actionTypes";
import * as api from "./../api/index.js";
export const movies_data_dashboard = (formData) => async (dispatch) => {
  try {
    const { data } = await api.movies_data_dashboard(formData);

    dispatch({ type: DASHBOARDMOVIES, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const count_on_dashboard = (formData) => async (dispatch) => {
  try {
    const { data } = await api.count_on_dashboard(formData);

    dispatch({ type: DASHBOARDCOUNT, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const total_user = (formData) => async (dispatch) => {
  try {
    const { data } = await api.total_user(formData);

    dispatch({ type: TOTALUSERS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const total_subscribe_user = (formData) => async (dispatch) => {
  try {
    const { data } = await api.total_subscribe_user(formData);

    dispatch({ type: TOTALSUBSCRIBEUSER, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const monthly_revenue = (formData) => async (dispatch) => {
  try {
    const { data } = await api.monthly_revenue(formData);

    dispatch({ type: MONTHLYREVENUE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const total_revenue = (formData) => async (dispatch) => {
  try {
    const { data } = await api.total_revenue(formData);

    dispatch({ type: TOTALREVENUE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const total_revenue_distribtor = (formData) => async (dispatch) => {
  try {
    const { data } = await api.total_revenue_distribtor(formData);

    dispatch({ type: TOTALREVENUEDIS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const most_watch_tv_show_dashboard = (formData) => async (dispatch) => {
  try {
    const { data } = await api.most_watch_tv_show_dashboard(formData);

    dispatch({ type: TV_SHOW_DASHBOARD, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const recent_subscriber_dashboard = (formData) => async (dispatch) => {
  try {
    const { data } = await api.recent_subscriber_dashboard(formData);

    dispatch({ type: RECENT_SUBSCRIBER_DASHBOARD, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const daily_revenue = (formData) => async (dispatch) => {
  try {
    const { data } = await api.daily_revenue(formData);

    dispatch({ type: DAILY_REVENUE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const max_login_duration = (formData) => async (dispatch) => {
  try {
    const { data } = await api.max_login_duration(formData);

    dispatch({ type: MAX_LOGIN_DURATION, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const renewal = (formData) => async (dispatch) => {
  try {
    const { data } = await api.renewal(formData);

    dispatch({ type: RENEWAL, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const producer_movie_graph = (formData) => async (dispatch) => {
  try {
    const { data } = await api.producer_movie_graph(formData);

    dispatch({ type: PRODUCER_MOVIE_GRAPH, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const advertisement_view_graph = (formData) => async (dispatch) => {
  try {
    const { data } = await api.advertisement_view_graph(formData);

    dispatch({ type: ADVERTISEMENT_VIEW_GRAPH, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const producer_movie_list = (formData) => async (dispatch) => {
  try {
    const { data } = await api.producer_movie_list(formData);

    dispatch({ type: PRODUCER_MOVIE_LIST, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const highest_movie_transaction_count =
  (formData) => async (dispatch) => {
    try {
      const { data } = await api.highest_movie_transaction_count(formData);

      dispatch({ type: HIGHESTMOVIECOUNT, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
  export const currently_logged_in_users_by_state_graph = (formData) => async (dispatch) => {
    try {
      const { data } = await api.currently_logged_in_users_by_state_graph(formData);
  
      dispatch({ type: CURRENTLY_LOGGED_IN_USERS_BY_STATE_GRAPH, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
  export const region_chart = (formData) => async (dispatch) => {
    try {
      const { data } = await api.region_chart(formData);
  
      dispatch({ type: REGION_CHART, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
  export const most_watched_movie = (formData) => async (dispatch) => {
    try {
      const { data } = await api.most_watched_movie(formData);
  
      dispatch({ type: MOST_WATCH_MOVIE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
  