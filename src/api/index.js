import axios from 'axios';

const API = axios.create({ baseURL: 'https://bridge.brionow.online/api/' });
export const IMAGE = 'https://bridge.brionow.online/'

// const API = axios.create({ baseURL: 'http://164.52.202.121:1341/api/' });
// export const IMAGE = 'http://164.52.202.121:1341/'

// const API = axios.create({ baseURL: 'http://ec2-15-206-35-104.ap-south-1.compute.amazonaws.com:8000/api/' });
// export const IMAGE = 'http://ec2-15-206-35-104.ap-south-1.compute.amazonaws.com:8000/'






// Master->Category
export const category_create = (formData) => API.post('/category_create/', formData);
export const category_update = (formData) => API.post('/category_update/', formData);
export const category_delete = (formData) => API.post('/category_delete/', formData);
export const category_status_update = (formData) => API.post("/category_status_update/" ,formData)  
export const all_category_list = (formData) => API.post('/all_category_list_admin/', formData);

// Master->Live stream Category
export const create_live_stream_category = (formData) => API.post('/create_live_stream_category/', formData);
export const update_live_stream_category = (formData) => API.post('/update_live_stream_category/', formData);
export const delete_live_stream_category = (formData) => API.post('/delete_live_stream_category/', formData);
export const update_live_stream_category_status = (formData) => API.post("/update_live_stream_category_status/" ,formData)  
export const live_stream_category_list = (formData) => API.post('/live_stream_category_list/', formData);

// Master -> complaint
export const complaint_type_create = (formData) => API.post('/complaint_type_create/', formData);
export const complaint_type_update = (formData) => API.post('/complaint_type_update/', formData);
export const complaint_type_delete = (formData) => API.post('/complaint_type_delete/', formData);
export const complaint_type_status_update = (formData) => API.post('/complaint_type_status_update/', formData);
export const complaint_type_list_admin = (formData) => API.post('/complaint_type_list_admin/', formData);

// Master->Category
export const song_category_create = (formData) => API.post('/song_category_create/', formData);
export const all_song_category_list_admin = (formData) => API.post('/all_song_category_list_admin/', formData);
export const song_category_status_update = (formData) => API.post('/song_category_status_update/', formData);
export const song_category_delete = (formData) => API.post('/song_category_delete/', formData);
export const song_category_update = (formData) => API.post('/song_category_update/', formData);


// Master->Sub Category
export const subcategory_create = (formData) => API.post('/subcategory_create/', formData);
export const subcategory_update = (formData) => API.post('/subcategory_update/', formData);
export const subcategory_delete = (formData) => API.post('/subcategory_delete/', formData);
export const subcategory_sequence_update = (formData) => API.post('/subcategory_sequence_update/', formData);
export const subcategory_status_update = (formData) => API.post('/subcategory_status_update/', formData);
export const all_subcategory_list = (formData) => API.post('/all_subcategory_list_admin/', formData);

// Master->Sub Category
export const ott_name_create = (formData) => API.post('/ott_name_create/', formData);
export const ott_name_update = (formData) => API.post('/ott_name_update/', formData);
export const ott_name_delete = (formData) => API.post('/ott_name_delete/', formData);
export const all_ott_name_list = (formData) => API.post('/all_ott_name_list/', formData);


// Master->Cast
export const cast_create = (formData) => API.post('/cast_create/', formData);
export const cast_update = (formData) => API.post('/cast_update/', formData);
export const cast_delete = (formData) => API.post('/cast_delete/', formData);
export const all_cast_list = (formData) => API.post('/all_cast_list_admin/', formData);
export const cast_status_update = (formData) => API.post('/cast_status_update/' , formData)

// Master 
export const all_payment_provider_list = (formData) => API.post('/all_payment_provider_list/' , formData)
export const payment_provider_update = (formData) => API.post('/payment_provider_update/' , formData)

//Coming Soon 
export const coming_soon_create = (formData) => API.post('/coming_soon_create/' , formData)
export const coming_soon_update = (formData) => API.post('/coming_soon_update/' , formData)
export const coming_soon_status_update = (formData) => API.post('/coming_soon_status_update/' , formData)
export const coming_soon_delete = (formData) => API.post('/coming_soon_delete/' , formData)
export const all_coming_soon_list_admin = (formData) => API.post('/all_coming_soon_list_admin/' , formData)


// Master->Country

export const country_create = (formData) => API.post('/country_create/', formData);
export const country_update = (formData) => API.post('/country_update/', formData);
export const country_status_update = (formData) => API.post('/country_status_update/', formData);
export const country_delete = (formData) => API.post('/country_delete/', formData);
export const all_country_list = (formData) => API.post('/all_country_list_admin/', formData);

// Song

export const song_create = (formData) => API.post('/song_create/', formData);
export const song_update = (formData) => API.post('/song_update/', formData);
export const song_status_update = (formData) => API.post('/song_status_update/', formData);
export const song_delete = (formData) => API.post('/song_delete/', formData);
export const all_song_list_admin = (formData) => API.post('/all_song_list_admin/', formData);
export const song_detail_admin = (formData) => API.post('/song_detail_admin/', formData);
export const song_watch_user_list = (formData) => API.post('/song_watch_by_user/', formData);
export const song_name_list = (formData) => API.post('/song_name_list/', formData);

// Need to add this APIs
// path('api/cast_details/',views.cast_details, name='cast_details'),

// Live stream 
export const create_live_stream = (formData) => API.post("/create_live_stream/" , formData)
export const update_live_stream = (formData) => API.post("/update_live_stream/" , formData)
export const live_stream_status_update = (formData) => API.post("/live_stream_status_update/" , formData)
export const delete_live_stream = (formData) => API.post("/delete_live_stream/" , formData)
export const live_stream_list_admin = (formData) => API.post("/live_stream_list_admin/" , formData) 


export const proxy_payouts = (formData) => API.post('/proxy_payouts/' ,formData)

// Promotion 

export const quick_promotion_create = (formData) => API.post('/promotion_create/' ,formData)
export const all_quick_promotion_list = (formData) => API.post('/all_promotion_list_admin/' , formData)
export const quick_promotion_update = (formData) => API.post('/promotion_update/' , formData)
export const promotion_status_update = (formData) => API.post('/promotion_status_update/' , formData)
export const quick_promotion_delete = (formData) => API.post('/promotion_delete/' , formData)

// Sub Ott

export const sub_ott_create = (formData) => API.post('/sub_ott_create/' ,formData)
export const sub_ott_update = (formData) => API.post('/sub_ott_update/' ,formData)
export const sub_ott_delete = (formData) => API.post('/sub_ott_delete/' ,formData)
export const all_sub_ott_list = (formData) => API.post('/all_sub_ott_list/' ,formData)

// Highlight 

export const highlight_create = (formData) => API.post('/highlight_create/' ,formData)
export const all_highlight_list = (formData) => API.post('/all_highlight_list/' , formData)
export const highlight_update = (formData) => API.post('/highlight_update/' , formData)
export const highlight_delete = (formData) => API.post('/highlight_delete/' , formData)


// Producer Form

export const producer_movie_form_create = (formData) => API.post('/producer_movie_form_create/' , formData)
export const all_producer_movie_form_list = (formData) => API.post('/all_producer_movie_form_list/' , formData)
export const producer_movie_form_update = (formData) => API.post('/producer_movie_form_update/' , formData)
export const producer_movie_detail_form = (formData) => API.post('/producer_movie_detail_form/' , formData)


export const producer_create = (formData) => API.post('/producer_register/', formData); // Pending
export const producer_update = (formData) => API.post('/producer_update/', formData); // Pending
export const producer_delete = (formData) => API.post('/producer_delete/', formData); // Pending
export const all_producer_list = (formData) => API.post('/all_producer_list/', formData); 

// Reports

export const report_data = (formData) => API.post("/report_data/" , formData)


// Master->Genre
export const genre_create = (formData) => API.post('/genre_create/', formData);
export const genre_update = (formData) => API.post('/genre_update/', formData);
export const genre_delete = (formData) => API.post('/genre_delete/', formData);
export const all_genre_list = (formData) => API.post('/all_genre_list/', formData);

// Demand
export const user_demand_content_list = (formData)=> API.post('/user_demand_content_list/' , formData)
export const user_demand_content_notifications = (formData)=> API.post('/user_demand_content_notifications/' , formData)

// Master -> Content Advisory
export const content_advisory_create = (formData) => API.post('/content_advisory_create/' , formData);
export const content_advisory_update = (formData) => API.post('/content_advisory_update/' , formData);
export const content_advisory_status_update = (formData) => API.post('/content_advisory_status_update/' , formData);
export const all_content_advisory_list = (formData) => API.post('/all_content_advisory_list_admin/' , formData); 
export const content_advisory_delete = (formData) => API.post("/content_advisory_delete/",formData);

// Master->Language
export const language_create = (formData) => API.post('/language_create/', formData);
export const language_update = (formData) => API.post('/language_update/', formData);
export const language_status_update = (formData) => API.post('/language_status_update/', formData);
export const language_delete = (formData) => API.post('/language_delete/', formData);
export const all_language_list = (formData) => API.post('/all_language_list_admin/', formData);

// Master->Distributor
export const distributor_create = (formData) => API.post('/distributor_register/', formData);
export const distributor_login = (formData) => API.post('/distributor_login/', formData);
export const distributor_update = (formData) => API.post('/distributor_update/', formData); 
export const distributor_delete = (formData) => API.post('/distributor_delete/', formData); 
export const distributor_status_update = (formData) => API.post('/distributor_status_update/', formData);
export const all_distributor_list = (formData) => API.post('/all_distributor_list_admin/', formData);
export const all_promocode_list_distributor = (formData) => API.post('/all_promocode_list_distributor/', formData);

// Master->Advertisor
export const advertiser_create = (formData) => API.post('/advertiser_register/', formData); // Pending
export const advertiser_update = (formData) => API.post('/advertiser_update/', formData); // Pending
export const advertiser_status_update = (formData) => API.post('/advertiser_status_update/', formData); // Pending
export const advertiser_delete = (formData) => API.post('/advertiser_delete/', formData); // Pending
export const all_advertiser_list = (formData) => API.post('/all_advertiser_list_admin/', formData); 
export const advertise_transaction_create = (formData) => API.post('/advertise_transaction_create/' , formData)
export const advertiser_transaction_history = (formData) => API.post("/advertiser_transaction_history/" , formData);
export const advertise_form_create = (formData) => API.post('/advertise_form_create/' , formData)
export const all_advertise_form_list = (formData) => API.post('/all_advertise_form_list/',formData)
export const advertise_form_upate = (formData) =>API.post('/advertise_form_upate/' , formData)
export const advertise_form_delete = (formData) => API.post('/advertise_form_delete/' , formData)
export const all_advertise_transaction_list = (formData) => API.post('/all_advertise_transaction_list/' , formData)
// export const advertise_transaction_create =(formData) => API.post('/advertise_transaction_create/',formData)

export const advertisement_charge_list = (formData) => API.post('/advertisement_charge_list/' , formData)
export const advertisement_charge_update = (formData) => API.post('/advertisement_charge_update/' , formData)
export const advertisement_payment_list_admin = (formData) => API.post('/advertisement_payment_list_admin/' , formData)
export const advertisement_payment_create = (formData) => API.post('/advertisement_payment_create/' , formData)
export const advertisement_payment_list_advertiser = (formData) => API.post('/advertisement_payment_list_advertiser/' , formData)


export const all_advertisement_list_admin = (formData) => API.post('/all_advertisement_list_admin/' , formData)
export const advertisement_status_update = (formData) => API.post('/advertisement_status_update/' , formData)
export const advertisement_in_movie_update = (formData) => API.post('/advertisement_in_movie_update/' , formData)
export const advertisement_in_movie_delete = (formData) => API.post('/advertisement_in_movie_delete/' , formData)
export const advertisement_name_id_only = (formData) => API.post('/advertisement_name_id_only/' , formData)

export const advertisement_in_episode_delete = (formData) => API.post('/advertisement_in_episode_delete/' , formData)
export const advertisement_in_episode_create = (formData) => API.post("/advertisement_in_episode_create/" , formData)
export const advertisement_in_episode_list_admin = (formData) => API.post("/advertisement_in_episode_list_admin/" , formData)
export const advertisement_in_episode_update = (formData) => API.post("/advertisement_in_episode_update/" , formData)

// Payment Gateway
export const get_payment_metadata = (formData) => API.post('/get_payment_metadata_admin/', formData)
// export const transaction_create = (formData) => API.post('/transaction_create/', formData)



// Master->Sub Admin
export const subadmin_create = (formData) => API.post('/subadmin_create/', formData); // Pending
export const subadmin_update = (formData) => API.post('/sub_admin_update/', formData); // Pending
export const subadmin_delete = (formData) => API.post('/sub_admin_delete/', formData); // Pending
export const all_subadmin_list = (formData) => API.post('/all_subadmin_list_admin/', formData); // Pending
export const all_module_listing = (formData) => API.post('/all_module_listing/', formData);

// Live Streaming->TV Category
export const tv_category_create = (formData) => API.post('/live_stream_category_create/', formData); 
export const tv_category_update = (formData) => API.post('/live_stream_category_update/', formData); 
export const tv_category_delete = (formData) => API.post('/live_stream_category_delete/', formData); 
export const all_tv_category_list = (formData) => API.post('/all_live_stream_category_list/', formData); 

// Live Streaming->TV Channel
export const tv_channel_create = (formData) => API.post('/live_stream_create/', formData); 
export const tv_channel_update = (formData) => API.post('/live_stream_update/', formData); 
export const tv_channel_delete = (formData) => API.post('/live_stream_delete/', formData); 
export const all_tv_channel_list = (formData) => API.post('/all_live_stream_list_admin/', formData); 
// Need to add this APIs
// path('api/live_stream_details/',views.live_stream_details, name='live_stream_details'),
 

// Merchandise->Coupon
export const coupon_create = (formData) => API.post('/promocode_create/', formData);
export const coupon_update = (formData) => API.post('/promocode_update/', formData);
export const coupon_delete = (formData) => API.post('/coupon_delete/', formData); 
export const all_coupon_list = (formData) => API.post('/all_promocode_list_admin/', formData);
export const coupon_details= (formData) => API.post('/user_promocode_list_admin/', formData);
export const coupon_status_update= (formData) => API.post('/promocode_status_update/', formData);
export const movie_list_for_promocode = (formData) => API.post('/movie_list_for_promocode/', formData);
export const series_list_for_promocode = (formData) => API.post('/series_list_for_promocode/', formData);

// Notification
export const notification_create = (formData) => API.post('/notification_create/', formData);
export const notification_update = (formData) => API.post('/notification_update/', formData);
export const notification_delete = (formData) => API.post('/notification_delete/', formData);
export const distributor_notification_list = (formData) => API.post('/distributor_notification_list/', formData);
export const all_notification_list = (formData) => API.post('/all_notification_list_admin/', formData);
export const notification_read_status_update = (formData) => API.post('/distributor_notification_read/', formData);
export const distributor_unread_count = (formData) => API.post('/distributor_unread_count/', formData);
export const notification_create_mask = (formData) => API.post('/notification_create_mask/', formData);

//content_leaving_soon
export const content_leaving_soon = (formData) => API.post('/content_leaving_soon/' , formData)
export const content_expire_date_update = (formData) => API.post('/content_expire_date_update/' , formData)


// Bank Details

export const get_bank_detail = (formData) => API.post('/get_bank_detail/' , formData);
export const add_bank_account = (formData) => API.post('/add_bank_account/' , formData);
export const bank_detail_list = (formData) => API.post('/bank_detail_list/' , formData);

// Curren
export const live_movie_view_list = (formData) => API.post('/live_movie_view_list/',formData);


// Merchandise->Slider Banner
export const sliderbanner_create = (formData) => API.post('/sliderbanner_create/', formData);
export const sliderbanner_update = (formData) => API.post('/slider_banner_update/', formData);
export const slide_banner_status_update = (formData) => API.post('/slide_banner_status_update/', formData);
export const sliderbanner_delete = (formData) => API.post('/slide_banner_delete/', formData);
export const all_sliderbanner_list = (formData) => API.post('/all_sliderbanner_list_admin/', formData);


export const song_sliderbanner_create = (formData) => API.post('/song_sliderbanner_create/', formData);
export const song_slider_banner_update = (formData) => API.post('/song_slider_banner_update/', formData);
export const song_slide_banner_status_update = (formData) => API.post('/song_slide_banner_status_update/', formData);
export const song_slide_banner_delete = (formData) => API.post('/song_slide_banner_delete/', formData);
export const all_song_sliderbanner_list_admin = (formData) => API.post('/all_song_sliderbanner_list_admin/', formData);
// Need to add API
// path('api/slider_details/',views.slider_details, name='slider_details'),


// Movie->Movie
export const movie_create = (formData) => API.post('/movie_create/', formData);
export const movie_update = (formData) => API.post('/movie_update/', formData);
export const movie_status_update = (formData) => API.post('/movie_status_update/', formData);
export const movie_delete = (formData) => API.post('/movie_delete/', formData);
export const all_movie_list = (formData) => API.post('/all_movie_list_admin/', formData);
export const movie_details = (formData) => API.post('/movie_detail_admin/', formData);
export const movie_watch_user_list = (formData) => API.post('/movie_watch_by_user/', formData);
export const subtitle_delete = (formData) => API.post("/subtitle_delete/" ,formData);
export const audio_file_delete = (formData) => API.post("/audio_file_delete/" ,formData);
export const all_movie_name_list  =(formData) => API.post("/only_movie_id_name/",formData);
export const all_movie_list_admin_loadless  =(formData) => API.post("/all_movie_list_admin_loadless/",formData);
export const all_movie_list_distributor  =(formData) => API.post("/all_movie_list_distributor/",formData);


// Movie->Upcoming Movie
export const upcoming_movie_create = (formData) => API.post('/upcoming_movie_create/', formData);
export const upcoming_movie_update = (formData) => API.post('/upcoming_movie_update/', formData);
export const upcoming_movie_delete = (formData) => API.post('/upcoming_movie_delete/', formData); 
export const all_upcoming_movie_list = (formData) => API.post('/all_upcoming_movie_list/', formData);

// Need to add API
// path('api/upcoming_movie_details/',views.upcoming_movie_details, name='upcoming_movie_details'),


// Report->PPV Customer
export const all_ppv_customer_list = (formData) => API.post('/all_subadmin_list/', formData); // Pending

// Report->Registered Customer
export const all_registered_customer_list = (formData) => API.post('/all_subadmin_list/', formData); // Pending

// Report->Registered Customer
export const all_subscribed_customer_list = (formData) => API.post('/all_subadmin_list/', formData); // Pending


// Web Series->Episode
export const episode_create = (formData) => API.post('/episode_create/', formData);
export const episode_update = (formData) => API.post('/episode_update/', formData);
export const episode_status_update = (formData) => API.post('/episode_status_update/', formData);
export const episode_delete = (formData) => API.post('/episode_delete/', formData);
export const all_episode_list = (formData) => API.post('/all_episode_list_admin/', formData);
export const episode_details= (formData) => API.post('/episode_detail_admin/', formData); // rather then this API we need to user episode_list_by_series
export const episode_watch_user_list= (formData) => API.post('/episode_watch_by_user/', formData);
export const episode_audio_file_delete = (formData) =>API.post('/episode_audio_file_delete/',formData)
export const episode_subtitle_delete = (formData) =>API.post('/episode_subtitle_delete/',formData)
export const all_episode_list_admin_loadless = (formData) =>API.post('/all_episode_list_admin_loadless/',formData)


// Need to add API
// path('api/episode_details/',views.episode_details, name='episode_details'),
// path('api/episode_list_by_series/',views.episode_list_by_series, name='episode_list_by_series'),


// Web Series->Series
export const series_create = (formData) => API.post('/series_create/', formData);
export const series_update = (formData) => API.post('/series_update/', formData);
export const series_status_update = (formData) => API.post('/series_status_update/', formData);
export const series_delete = (formData) => API.post('/series_delete/', formData);
export const all_series_list = (formData) => API.post('/all_series_list_admin/', formData);
export const series_details_admin = (formData) => API.post('/series_detail_admin/' , formData)
export const only_series_name = (formData) => API.post('/only_series_id_name/' , formData)
export const all_series_list_admin_loadless = (formData) => API.post('/all_series_list_admin_loadless/' , formData)
export const all_series_list_distributor = (formData) => API.post('/all_series_list_distributor/' , formData)

// Web Series->Season
export const season_create = (formData) => API.post('/season_create/', formData);
export const season_update = (formData) => API.post('/season_update/', formData);
export const season_status_update = (formData) => API.post('/season_status_update/', formData);
export const season_delete = (formData) => API.post('/season_delete/', formData);
export const only_season_id_name = (formData) => API.post('/only_season_id_name/', formData);
export const all_season_list = (formData) => API.post('/all_season_list_admin/', formData);
// Need to add API
// path('api/series_details/',views.series_details, name='series_details'),

// Content Submission
export const distributor_content_submission_create = (formData) => API.post('/distributor_content_submission_create/' , formData)
export const distributor_content_update = (formData) => API.post('/distributor_content_submission_update/' , formData)

export const all_distributor_content_submission_list = (formData) => API.post('/all_distributor_content_submission_list/' , formData)
export const all_distributor_content_submission_list_admin = (formData) => API.post('/all_distributor_content_submission_list_admin/' , formData)
export const distributor_content_submission_update = (formData) => API.post('/distributor_content_submission_update/' , formData)


export const all_distributor_movie_list = (formData) => API.post('/all_distributor_movie_list/' , formData)
export const all_distributor_series_list = (formData) => API.post('/all_distributor_series_list/' , formData)
export const all_distributor_song_list = (formData) => API.post('/all_distributor_song_list/' , formData)


// Advertisement
export const advertisement_create = (formData) => API.post('/advertisement_create/', formData);
export const advertisement_update = (formData) => API.post('/advertisement_update/', formData);
export const advertisement_delete = (formData) => API.post('/advertise_delete/', formData);
export const advertisement_list_advertiser = (formData) => API.post('/advertisement_list_advertiser/', formData);
export const all_advertisement_list = (formData) => API.post('/all_advertise_list/', formData);
export const set_advertise = (formData) => API.post('/set_advertise/',formData)
export const set_advertise_list = (formData) =>API.post('/set_advertise_list/' , formData);
export const set_update_advertise = (formData) => API.post('/set_update_advertise/' ,formData);
export const set_advertise_delete = (formData) => API.post('/set_advertise_delete/',formData)

export const advertiser_login = (formData) => API.post('/advertiser_login/' , formData)


// Ad in movie
export const advertisement_in_movie_create = (formData) => API.post('/advertisement_in_movie_create/', formData)
export const advertisement_in_movie_list_admin = (formData) => API.post('/advertisement_in_movie_list_admin/', formData)


// Customer
export const customer_update = (formData) => API.post('/user_status_update/', formData); // Pending
export const customer_delete = (formData) => API.post('/customer_delete/', formData); // Pending
export const all_customer_list = (formData) => API.post('/customer_list/', formData); // Pending
export const customer_details = (formData) => API.post('/user_detail_admin/', formData); // Pending
export const highest_plan_buy_count = (formData) => API.post('/highest_plan_buy_count/',formData)
export const highest_rented_movie_count = (formData) => API.post('/highest_rented_movie_count/',formData)
export const all_customer_list_admin_loadless = (formData) => API.post('/user_list_admin/',formData)
export const search_customer_admin = (formData) => API.post('/search_customer_admin/',formData)


// Subscription
export const subscription_create = (formData) => API.post('/subscription_create/', formData);
export const subscription_update = (formData) => API.post('/subscription_update/', formData);
export const subscription_status_update = (formData) => API.post('/subscription_status_update/', formData);
export const subscription_delete = (formData) => API.post('/subscription_delete/', formData);
export const all_subscription_list = (formData) => API.post('/all_subscription_list_admin/', formData);
// Need to add API
// path('api/subscription_details/',views.subscription_details, name='subscription_details'),


// Transaction
export const all_transaction_list = (formData) => API.post('/all_transaction_list_admin/', formData); // Pending
export const all_successfull_transaction_admin_loadless = (formData) => API.post('/all_successfull_transaction_admin_loadless/', formData); // Pending
export const transaction_create = (formData) => API.post('/transaction_create/', formData); // Pending
export const user_subscription_by_admin = (formData) => API.post('/user_subscription_by_admin/', formData); // Pending


// Watch Hours
export const all_watchhour_list = (formData) => API.post('/all_watch_hours_list/', formData); // Pending

// Complaints
export const all_complaint_list = (formData) => API.post('/user_complaint_list_admin/', formData); // Pending
export const complaint_status_update = (formData) => API.post('/user_complaint_status_update/', formData); // Pending

 

export const top_ten_create = (formData) => API.post("/top_ten_create/" , formData)
export const all_top_ten_list_admin = (formData) => API.post("/all_top_ten_list_admin/" , formData)
export const top_ten_update = (formData) => API.post("/top_ten_update/" , formData)
export const top_ten_delete = (formData) => API.post("/top_ten_delete/" , formData)


// Setting->Avatar
export const avatar_create = (formData) => API.post('/avatar_create/', formData);
export const avatar_update = (formData) => API.post('/avatar_update/', formData);
export const avatar_delete = (formData) => API.post('/avatar_delete/', formData);
export const all_avatar_list = (formData) => API.post('/all_avatar_list/', formData);

// Dashboard
export const movies_data_dashboard = (formData) => API.post('/movies_data_dashboard/', formData);
export const count_on_dashboard = (formData) => API.post('/dashboard_counts/', formData);
export const total_user = (formData) => API.post('/graph_registered_user/', formData);
export const total_subscribe_user = (formData) => API.post('/graph_subscribe_user/', formData);
export const monthly_revenue = (formData) => API.post('/monthly_revenue/', formData);
export const daily_revenue = (formData) => API.post('/daily_revenue/', formData);
export const total_revenue = (formData) => API.post('/tvod_revenue/', formData);
export const most_watch_tv_show_dashboard = (formData) => API.post('/most_watched_series/', formData);
export const recent_subscriber_dashboard = (formData) => API.post('/recent_subscriber_dashboard/', formData);
export const max_login_duration = (formData) => API.post('/max_login_duration/', formData);
export const renewal = (formData) => API.post('/renewal/', formData);
export const producer_movie_graph = (formData) => API.post('/producer_dashboard/', formData);
export const producer_movie_list = (formData) => API.post('/producer_dashboard_movie_listing/', formData);
export const advertisement_view_graph = (formData) => API.post('/dashboard_advertisement_graph/', formData);
export const region_chart = (formData) => API.post('/region_chart/', formData);
export const most_watched_movie = (formData) => API.post('/most_watched_movie/', formData);

// Distributor Dashboare
export const distrubutor_most_watched_movie = (formData) => API.post("/distrubutor_most_watched_movie_graph/" , formData);
export const distributor_most_watched_series = (formData) => API.post("/distributor_most_watched_series_graph/" , formData);
export const distributor_most_watched_song = (formData) => API.post("/distributor_most_watched_song_graph/" , formData);
export const distributor_movie_yearly_revenue = (formData) => API.post("/distributor_movie_yearly_revenue/" , formData);
export const distributor_series_yearly_revenue = (formData) => API.post("/distributor_series_yearly_revenue/" , formData);
export const distributor_song_yearly_revenue = (formData) => API.post("/distributor_song_yearly_revenue/" , formData);
export const distributor_dashboard_count = (formData) => API.post("/distributor_dashboard_count/" , formData);



export const highest_movie_transaction_count = (formData) => API.post('/highest_movie_transaction_count/' , formData)
export const total_revenue_distribtor = (formData) => API.post('/distribtor_tvod_revenue/', formData);

//Authenticate
export const login = (formData) => API.post('/admin_login/', formData);
export const forgot_password = (formData) => API.post('/forgot_password_send_otp/', formData);
export const change_password = (formData) => API.post('/change_password_master/', formData);
export const verify_otp = (formData) => API.post('/forgot_password_verify_otp/' ,formData)

//Payment 
export const distributor_producer_transaction = (formData) => API.post('/distributor_producer_transaction/' ,formData)

//Setting-> About us
export const about_us = (formData) => API.post('/about_us/', formData);
export const about_us_update = (formData) => API.post('/about_us_update/', formData);

//Setting-> Refund Policy
export const refund_policy = (formData) => API.post('/refund_policy/', formData);
export const refund_policy_update = (formData) => API.post('/refund_policy_update/', formData);

//Setting-> Privacy Policy
export const privacy_policy = (formData) => API.post('/privacy_policy/', formData);
export const privacy_policy_update = (formData) => API.post('/privacy_policy_update/', formData);

//Setting-> Terms And Conditions
export const terms_and_conditions = (formData) => API.post('/terms_and_conditions/', formData);
export const terms_and_conditions_update = (formData) => API.post('/terms_and_conditions_update/', formData);

//Setting-> App Seetting
export const app_setting = (formData) => API.post('/app_setting/', formData);
export const app_setting_update = (formData) => API.post('/app_setting_update/', formData);

//Setting-> User Logs
export const user_log_list = (formData) => API.post('/user_log_list/', formData);
export const user_log_detail = (formData) => API.post('/user_log_details/', formData);


//import
export const bulk_import = (formData) => API.post('/bulk_import/', formData);


//analytics
export const highest_watched_movies_graph = (formData) => API.post('/highest_watched_movies_graph/', formData);
export const lowest_watched_movies = (formData) => API.post('/lowest_watched_movie_graph/', formData);
export const highest_watched_series_graph = (formData) => API.post('/highest_watched_series_graph/', formData);
export const lowest_watched_series_graph = (formData) => API.post('/lowest_watched_series_graph/', formData);
export const highest_watched_song_graph = (formData) => API.post('/highest_watched_song_graph/', formData);
export const lowest_watched_song = (formData) => API.post('/lowest_watched_song_graph/', formData);
export const highest_searched_movies_graph = (formData) => API.post('/highest_searched_movies_graph/', formData);
export const currently_logged_in_users = (formData) => API.post('/currently_logged_in_users/', formData);
export const currently_logged_in_users_by_state_graph = (formData) => API.post('/currently_logged_in_users_by_state_graph/', formData);
export const currently_watching_users = (formData) => API.post('/currently_watching_users/', formData);
export const device_used_for_watching = (formData) => API.post('/device_used_for_watching/', formData);
export const area_wise_ad_view = (formData) => API.post('/area_wise_ad_view/', formData);
