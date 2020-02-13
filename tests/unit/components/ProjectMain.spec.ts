import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { shallowMount } from '@vue/test-utils';
import ProjectMain from '@/components/ProjectMain.vue';

Vue.use(Vuetify);
Vue.use(VueRouter);

const wrapper = shallowMount(ProjectMain);

describe('ProjectMain', () => {
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
