"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const register_form_component_1 = require("./Components/register-form/register-form.component");
const landing_page_component_1 = require("./Components/landing-page/landing-page.component");
const login_component_1 = require("./Components/login/login.component");
const view_listings_component_1 = require("./Components/view-listings/view-listings.component");
const listing_profile_component_1 = require("./Components/listing-profile/listing-profile.component");
const appointment_page_component_1 = require("./Components/appointment-page/appointment-page.component");
const reset_password_component_1 = require("./Components/reset-password/reset-password.component");
const admin_dashboard_component_1 = require("./Components/admin-dashboard/admin-dashboard.component");
const specialist_dashboard_component_1 = require("./Components/specialist-dashboard/specialist-dashboard.component");
const client_dashboard_component_1 = require("./Components/client-dashboard/client-dashboard.component");
const add_listing_component_1 = require("./Components/add-listing/add-listing.component");
const wild_card_component_1 = require("./Components/wild-card/wild-card.component");
exports.routes = [
    { path: 'register', component: register_form_component_1.RegisterFormComponent },
    { path: '', component: landing_page_component_1.LandingPageComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'listings', component: view_listings_component_1.ViewListingsComponent },
    { path: 'listing-profile', component: listing_profile_component_1.ListingProfileComponent },
    { path: 'appointment-page', component: appointment_page_component_1.AppointmentPageComponent },
    { path: 'admin-dashboard', component: admin_dashboard_component_1.AdminDashboardComponent },
    { path: 'reset-password', component: reset_password_component_1.ResetPasswordComponent },
    { path: 'client-dashboard', component: client_dashboard_component_1.ClientDashboardComponent },
    { path: 'specialist-dashboard', component: specialist_dashboard_component_1.SpecialistDashboardComponent },
    { path: 'add-listing', component: add_listing_component_1.AddListingComponent },
    { path: '**', component: wild_card_component_1.WildCardComponent },
];
