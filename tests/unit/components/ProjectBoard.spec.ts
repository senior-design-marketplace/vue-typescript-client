import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { mount } from '@vue/test-utils';
import ProjectBoard from '@/components/ProjectBoard.vue';

Vue.use(Vuetify);
Vue.use(VueRouter);

const boardItems = [
  {
    date: 'December 2019',
    desc: 'Testing!',
    img: [],
  },
];

const wrapper = mount(ProjectBoard, {
  propsData: {
    boardItems,
  },
  stubs: ['VDataIterator'],
});

describe('ProjectBoard', () => {
  test('Sanity', () => {
    expect(true).toBe(true);
  });

  test('Visible', () => {
    expect(wrapper.isVisible()).toBe(true);
  });

  test('Renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
