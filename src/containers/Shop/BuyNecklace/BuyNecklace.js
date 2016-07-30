import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-async-connect';
import {UserCenterLeftPanel} from 'containers';
import Image from 'react-bootstrap/lib/Image';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import { routeActions } from 'react-router-redux';
import * as productAction from 'redux/modules/product';


// TODO: 增加错误展示界面，监听loadInfo的错误
/* eslint-disable */ 
@asyncConnect([{
  promise: ({store: {dispatch, getState}, helpers: {client}}) => {
    return dispatch(productAction.loadNecklace());
  }
}])
@connect((state => ({necklaces: state.product.products.necklaces})),
        {redirectTo: routeActions.push})
export default class UserCenter extends Component {
  static propTypes = {
    necklaces: PropTypes.object,
    redirectTo: PropTypes.func.isRequired
  };

  renderChoice(item) {
    const styles = require('./BuyNecklace.scss');
    return (
      <div>
      </div>
    );
  }
  renderItem(item) {
      // <div className="col-md-3" style={{width:'250px', height:'180px'}}>
    const styles = require('./BuyNecklace.scss');
    const imagePath = require('../../../../static/diaozhui.png');
    // const imagePath = require(item.hero_image);
          // <ul className={styles.chooseOption}>
          //   <li >18K白金</li>
          //   <li>18K黄金</li>
          // </ul>
    return (
      <div className={styles.gridItem + " container"}>
        <div className={styles.selectionImage}>
          <Image width={400} height={400} alt='400x400' src={imagePath} responsive rounded/>
        </div>
        <div className={styles.productSelectionArea}>
          <p className={styles.introductionTitle}>{item.name}</p>
          <p className={styles.introductionSummary}>{item.name}</p>
          <p className={styles.subTitle}>{"1.选择材质"}</p>
          <ButtonToolbar>
            <Button bsSize="large">18K白金</Button>
            <Button bsSize="large">18K黄金</Button>
          </ButtonToolbar>
          <p className={styles.chooseOptionComment}></p>
          <p className={styles.subTitle}>{"2.选择手寸"}</p>
          <ButtonToolbar>
            <Button bsSize="large">11</Button>
            <Button bsSize="large">12</Button>
            <Button bsSize="large">13</Button>
            <Button bsSize="large">14</Button>
          </ButtonToolbar>
          <p className={styles.chooseOptionComment}></p>
          <p className={styles.subTitle}>{"3.选择数量"}</p>
          <ButtonGroup>
            <Button bsSize="large">-</Button>
            <Button bsSize="large">0</Button>
            <Button bsSize="large">+</Button>
          </ButtonGroup>
          <p className={styles.chooseOptionComment}></p>
          <Button bsSize="large" bsStyle="info" href="/cart">立即购买</Button>
        </div>
      </div>
    );
  }

  render() {
    const styles = require('./BuyNecklace.scss');
    const {necklaces} = this.props;
    let item = necklaces[0];
    let itemView = null;
    if (item) {
      itemView = this.renderItem(item);
    }

    return (
      <div className={styles.necklacePage + ' container'}>
        {itemView}
      </div>
    );
  }
}
