import React, { Component , PropTypes }   from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import Slider from "react-slick"

import Episode from "./Episode"
import MailingList from "./MailingList"
import SocialMediaCard from "./SocialMediaCard"
import AdvertiserCard from "./AdvertiserCard"
import EpisodeCard from "./EpisodeCard"
import LatestBlogCard from "./LatestBlogCard"
import LatestEpisodePlayer from "./LatestEpisodePlayer"

import {get_homepage_content} from '../utils/redux_loader'

/*
                <div className="card">
                  <EpisodeCard id="old_episode" key="old_episode" episode={old_episode} title="From the archives" />
                </div>
                <div className="card">
                  <EpisodeCard id="latest_episode" key="latest_episode" episode={episode} title="Latest episode" />
                </div>
*/

class Home extends Component {

  componentWillMount() {
      var dispatch = this.props.dispatch
      get_homepage_content(dispatch)
  }

  render() {
    var oepisodes = this.props.episodes.toJS()
    var oblogs = this.props.blogs.toJS()
    var settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: 1,
      adaptiveHeight: 1,
      accessibility: 1,
      autoplay: 1,
      autoplaySpeed: 10000,
      pauseOnHover: 1
    };
    var episode = oepisodes.focus_episode
    var blog_focus = oblogs.blog_focus
    /*
    var old_episode = undefined
    var episodes = oepisodes.episodes
    if (episodes.length > 0) {
      episode = episodes[0]
      var i = 52
      if (episodes.length < i+1) {
        i = episodes.length - 1
      }
      old_episode = episodes[i]
    }
    */
    return (
      <div className="center">
        <div className="row">
          <div className="col-sm-12 home-statement">
            <p>Data Skeptic is your source for a perseptive of scientific skepticism on topics in statistics, machine learning, big data, artificial intelligence, and data science.  Our weekly podcast and blog bring you stories and tutorials to help understand our data-driven world.</p>
            <p>To reach out to the podcast, please visit our <a href="/contact-us">Contact Us</a> page.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-8">
            <div className="carousel">
              <Slider {...settings}>
                <div className="card">
                  <AdvertiserCard />
                </div>
                <div className="card">
                  <SocialMediaCard />
                </div>
                <div className="card">
                  <LatestBlogCard blog={blog_focus.blog} contributor={blog_focus.contributor} />
                </div>
              </Slider>
            </div>          
          </div>
          <div className="col-xs-12 col-sm-4">
            <div className="home-player">
              <LatestEpisodePlayer title="Latest episode:" episode={episode} />
            </div>
            <MailingList />
          </div>
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

export default connect(state => ({ episodes: state.episodes, blogs: state.blogs }))(Home)
