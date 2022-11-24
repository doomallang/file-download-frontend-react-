import Tree from "rc-tree";
import React from "react"
import './index.less'
import './icon.less';
import 'tree.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersRectangle } from '@fortawesome/free-solid-svg-icons'

function getNewTreeData(treeData, curKey, child) {
  const loop = (treeData) => {
    treeData.map(item => {
          if(curKey.indexOf(item.key) === 0) {
              if(item.children) {
                  loop(item.children)
              } else {
                  item.children = child
              }
          }
      })
  }
  loop(treeData);
}

const Icon = ({ selected }) => (
  <>
  
  <FontAwesomeIcon icon={faUsersRectangle} color="gray" />
  </>
);

class GroupTree extends React.Component {
  state = {
      treeData: [],
  }
  
  componentDidMount() {
    const list = this.props.list.map(item => {
      let newArr = {}
      newArr['title'] = item.groupName
      newArr['key'] = `0-${item.groupId}`
      if(item.hasChild === 0) {
          newArr['isLeaf'] = true
      }
      return newArr
    })
    setTimeout(() => {
      this.setState({
        treeData: list
      })
    }, 100)
  }

  onSelect = (info, event) => {
    if(info.length === 0) {
      this.props.setSelectGroup('')  
    }
    this.props.setSelectGroup({
      groupKey: info,
      groupName: event.node.title
    })
  }

  onLoadData = async (treeNode) => {
    const treeData = [...this.state.treeData];
    let key = treeNode.key
    key = key.split('-')
    const child = await this.props.getSelectGroupList(key[key.length - 1], treeNode.key)    
    await getNewTreeData(treeData, treeNode.key, child)
    await this.setState({ treeData })
  }
  
  render() {
    const { treeData } = this.state
    return (
      <>
        <Tree
          icon={Icon}
          showLine={true}
          onSelect={this.onSelect}
          loadData={this.onLoadData}
          treeData={treeData}
        />
      </>
    );
  }
}

export default GroupTree