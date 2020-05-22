import API from './api.js';
import ProfileComponent from './components/profile.js';
import FooterStatComponent from './components/statistics.js';
import {getRandomIntegerNumber} from './utils/common.js';
import {render} from './utils/render.js';
import PageController from './controllers/page-controller.js';
import MoviesModel from './models/movies.js';

const AUTHORIZATION = `Basic eo0w59075hf7ik29889a=`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const api = new API(END_POINT, AUTHORIZATION);

const profileRating = getRandomIntegerNumber(0, 35);
const headerElement = document.querySelector(`.header`);
render(headerElement, new ProfileComponent(profileRating));

const mainElement = document.querySelector(`.main`);
const moviesModel = new MoviesModel();

const pageController = new PageController(mainElement, moviesModel, api);

const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
const moviesCount = getRandomIntegerNumber(100000, 150000);

render(footerStatisticsElement, new FooterStatComponent(moviesCount));


api.getFilms()
.then((movies) => {
  moviesModel.setFilms(movies)
  pageController.render();
})
