import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailHandBook.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import Header from "../../Header/Header";
import { getDetailHandbookById, getAllCodeService, } from '../../../services/userSevice'
import _ from "lodash";
class DetailHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetail: true,
            dataDetailHandbook: {},
        };
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailHandbookById({
                id: id,
            });

            if (res && res.errCode === 0) {
                let data = res.data
                this.setState({
                    dataDetailHandbook: data,
                });
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    };



    render() {
        let { language } = this.props
        let { dataDetailHandbook, isShowDetail } = this.state
        console.log('check response:', this.state)
        return (
            <>
                <div className="detail-clinic-container">
                    <Header />
                    <HomeHeader />
                    <div className={isShowDetail === false ? 'description-clinic small ' : 'description-clinic large'}
                        style={{ backgroundImage: `url(${dataDetailHandbook && dataDetailHandbook.imageBackground ? dataDetailHandbook.imageBackground : ""})` }}
                    >
                        <div className={isShowDetail === false ? "descriptionHTML small  " : 'descriptionHTML large'}>
                            {dataDetailHandbook && !_.isEmpty(dataDetailHandbook)
                                &&
                                <div dangerouslySetInnerHTML={{ __html: dataDetailHandbook.descriptionHTML }} >
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
