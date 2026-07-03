import React, { Suspense } from "react";
import Grid from "@mui/material/Grid";

const HighestWatchedMovieGraph = React.lazy(() =>
  import("./elements/HighestWatchedMovieGraph")
);
const LowestWatchedMovies = React.lazy(() =>
  import("./elements/LowestWatchedMovies")
);
const HighestSearchedMovieGraph = React.lazy(() =>
  import("./elements/HighestSearchedMovieGraph")
);
const DeviceUsedForWatchingMovie = React.lazy(() =>
  import("./elements/DeviceUsedForWatchingMovie")
);
const AreaWiseAdView = React.lazy(() => import("./elements/AreaWiseAdView"));

const CurrentlyLoggedInUsers = React.lazy(() =>
  import("./elements/CurrentlyLoggedInUsers")
);
const CurrentlyWatchingUsers = React.lazy(() =>
  import("./elements/CurrentlyWatchingUsers")
);

const AdvertisementViewGraph = React.lazy(() =>
  import("./elements/AdvertisementGraph")
);
const HighestWatchedSeriesGraph = React.lazy(() =>
  import("./elements/HighestWatchedSeriesGraph")
)
const HighestWatchedSongGraph = React.lazy(() =>
  import("./elements/HighestWatchedSongGraph")
)
const LowestWatchedSeriesGraph = React.lazy(()=>
  import("./elements/LowestWatchedSeries")
)
const LowestWatchedSongGraph = React.lazy(() =>
  import("./elements/LowestWatchedSong")
)

export default function Analytics() {
  return (
    <Suspense>
      <>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
          <Grid item xs={12} md={12} lg={6} xl={6}>
            <HighestWatchedMovieGraph />
          </Grid>
          <Grid item xs={12} md={12} lg={6} xl={6}>
            <LowestWatchedMovies />
          </Grid>
          <Grid item xs={12} md={12} lg={6} xl={6}>
            <HighestWatchedSeriesGraph />
          </Grid>
          <Grid item xs={12} md={12} lg={6} xl={6}>
            <LowestWatchedSeriesGraph />
          </Grid>
          {/* <Grid item xs={12} md={12} lg={6} xl={6}>
            <HighestWatchedSongGraph />
          </Grid>
          <Grid item xs={12} md={12} lg={6} xl={6}>
            <LowestWatchedSongGraph />
          </Grid> */}
          <Grid item xs={12} md={12} lg={12} xl={8}>
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
              <Grid item xs={12} md={12}>
                <HighestSearchedMovieGraph />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={12} lg={12} xl={4}>
            <DeviceUsedForWatchingMovie />
          </Grid>
          {/* <Grid item container xs={12} md={12} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <CurrentlyLoggedInUsers  />
            </Grid>
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <CurrentlyWatchingUsers  />
            </Grid>
          </Grid> */}

          {/* <Grid
            item
            container
            xs={12}
            md={12}
            columnSpacing={{ xs: 1, sm: 2, md: 2 }}
          >
            <Grid item xs={12} md={6} lg={6} xl={8}>
              <AdvertisementViewGraph />
            </Grid>
            <Grid item xs={12} md={6} lg={6} xl={4}>
              <AreaWiseAdView />
            </Grid>
          </Grid> */}
        </Grid>
      </>{" "}
    </Suspense>
  );
}
