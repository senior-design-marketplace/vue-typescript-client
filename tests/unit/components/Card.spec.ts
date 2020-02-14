import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { mount } from '@vue/test-utils';
import Card from '@/components/Card.vue';

Vue.use(Vuetify);
Vue.use(VueRouter);

const id = '00000000-0000-0000-0000-000000000000';
const avatar = 'https://i.imgur.com/bv3cLys.png';
const title = 'marqetplace.';
const starred = true;
const coverImg = '://www.lifeofpix.com/wp-content/uploads/2018/04/275-ake6418-jj-jite-001-1600x1000.jpg';
const tagline = 'The Senior Design Marketplace team’s mission is to expand on the foundations of the previous groups and implement an online marketplace that will streamline the creation and organization of senior design projects at Stevens. The Senior Design Marketplace is a web application that transforms the senior design project selection and organization process into a simple, efficient, and streamlined activity. Using the marketplace, faculty can create and display projects to students who can choose to view or join them. Students are also able to create their own project proposals and submit them for approval by advisors or program coordinators.';
const tags = ['Computer Science', 'Software Eng.', 'Engineering Management'];

const wrapper = mount(Card, {
  stubs: ['router-link', 'VChipGroup'],
  propsData: {
    id,
    avatar,
    title,
    starred,
    coverImg,
    tagline,
    tags,
  },
});

describe('Card', () => {
  test('Sanity', () => {
    expect(true).toBe(true);
  });

  test('Visible', () => {
    expect(wrapper.isVisible()).toBe(true);
  });

  test('Renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Avatar', () => {
    expect(wrapper.find('.v-avatar').exists()).toBe(true);
  });

  test('Title', () => {
    expect(wrapper.find('.headline').text()).toBe(title);
  });

  test('Cover Image', () => {
    expect(wrapper.find('.v-image__image--cover').exists()).toBe(true);
  });

  test('Tagline', () => {
    expect(wrapper.find('.v-card__text>div>div').text()).toBe(tagline);
  });

  test('Tags', () => {
    expect(wrapper.findAll('.v-chip').length).toBe(3);
  });
});
