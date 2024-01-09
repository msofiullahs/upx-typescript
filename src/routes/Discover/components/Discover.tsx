import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import config from '../../../config';
import axios from 'axios';
import qs from 'qs';

interface IProps {
}

interface IState {
  newReleases: [],
  playlists: [],
  categories: []
}

export default class Discover extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  getNewReleases(token: any) {
    const url = `${config.api.baseUrl}/browse/new-releases`
    axios({
      method: "GET",
      url: url,
      maxBodyLength: Infinity,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((resp) => {
      this.setState({
        newReleases: resp.data.albums.items
      })
      this.getPlaylist(token);
    })
  }

  getPlaylist(token: any) {
    const url = `${config.api.baseUrl}/browse/featured-playlists`
    axios({
      method: "GET",
      url: url,
      maxBodyLength: Infinity,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((resp) => {
      this.setState({
        playlists: resp.data.playlists.items
      })
      this.getCategories(token)
    })
  }

  getCategories(token: any) {
    const url = `${config.api.baseUrl}/browse/categories`
    axios({
      method: "GET",
      url: url,
      maxBodyLength: Infinity,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((resp) => {
      this.setState({
        categories: resp.data.categories.items
      })
    })
  }

  componentDidMount() {
    const tokenUrl = config.api.authUrl
    const clientId = config.api.clientId
    const clientSecret = config.api.clientSecret
    const data = qs.stringify({
      'grant_type': 'client_credentials',
      'client_id': clientId,
      'client_secret': clientSecret
    })
    axios({
      method: "POST",
      url: tokenUrl,
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: data
    }).then((resp) => {
      const token = resp.data.access_token;
      this.getNewReleases(token);
    })
  }

  render() {
    const { newReleases, playlists, categories }: any = this.state;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
