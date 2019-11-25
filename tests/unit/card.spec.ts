import Vue from 'vue';

import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import Card from '@/components/Card.vue';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VueRouter);

const id = '00000000-0000-0000-0000-000000000000';
const avatar = 'https://i.imgur.com/bv3cLys.png';
const title = 'marqetplace.';
const starred = true;
const coverImg = '://www.lifeofpix.com/wp-content/uploads/2018/04/275-ake6418-jj-jite-001-1600x1000.jpg';
const tagline = 'The Senior Design Marketplace team’s mission is to expand on the foundations of the previous groups and implement an online marketplace that will streamline the creation and organization of senior design projects at Stevens. The Senior Design Marketplace is a web application that transforms the senior design project selection and organization process into a simple, efficient, and streamlined activity. Using the marketplace, faculty can create and display projects to students who can choose to view or join them. Students are also able to create their own project proposals and submit them for approval by advisors or program coordinators.';
const tags = ['Computer Science', 'Software Eng.', 'Engineering Management'];

const wrapper = shallowMount(Card, {
  localVue: Vue,
  propsData: {
    id, avatar, title, starred, coverImg, tagline, tags,
  },
});

describe('Card', () => {
  // beforeEach(() => {
  //   let wrapper = shallowMount(Card, {
  //     localVue: Vue,
  //     propsData: { id, avatar, title, starred, coverImg, tagline, tags }
  //   });
  // });

  it('Is visible', () => {
    expect(wrapper.isVisible()).toBe(true);
  });

  it('Renders proper text in body', () => {
    expect(wrapper.text()).toBe(`${tagline} ${tags.join('')} Read More`);
  });
});
