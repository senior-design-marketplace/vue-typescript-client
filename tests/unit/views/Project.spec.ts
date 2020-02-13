import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { shallowMount } from '@vue/test-utils';
import Project from '@/views/Project.vue';

Vue.use(Vuetify);
Vue.use(VueRouter);

const methodStub = jest.fn();

const wrapper = shallowMount(Project, {
  stubs: ['router-link', 'VChipGroup'],
  methods: {
    getProjectData: methodStub,
  },
});

describe('Project', () => {
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
