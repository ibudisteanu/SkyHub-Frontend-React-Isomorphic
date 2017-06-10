/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 5/24/2017.
 * (C) BIT TECHNOLOGIES
 */

import React from 'react';
import {connect} from "react-redux";
import { Link, withRouter } from 'react-router';

import {getPath} from 'common/common-functions';
import { AuthService } from 'modules/services/REST/authentication/auth.service';
import { ContentService } from 'modules/services/REST/forums/content/Content.service.js';
import {Hero, HeroHeader, HeroHeader2 } from 'modules/website/template/components/hero.component';
import {ForumsButtons} from 'modules/forums/components/ForumsButtons.component';

import {PreviewContent} from '../components/PreviewContent.component';

import {
    PanelContainer,
    Label,
} from '@sketchpixy/rubix';

@withRouter
@connect(
    state => ({
        userAuthenticated : state.userAuthenticated,
    }),
    dispatch => ({dispatch}),
)
export class DisplayContent extends React.Component {

    constructor(props){
        super(props);

        this.AuthService = new AuthService(props.dispatch);
        this.ContentService = new ContentService(props.dispatch);

        this.state = {

            hasNext: true,
            pageIndex: props.parent||props.params.pageIndex||1,
            pageCount:8,

            parent: props.parent||props.params.parent||'',
            contentObjects : [],
        }

    }

    async componentWillMount() {
        return await this.fetchTopContent();
    }


    async fetchTopContent(){

        let answer = await this.ContentService.fetchTopContent(this.state.parent, this.state.pageIndex, this.state.pageCount);

        console.log("FEEETCHING TOP CONTENT", answer);

        if (answer.result === "true"){


            this.setState({
                hasNext: answer.hasNext,
                pageIndex: answer.newPageIndex,
            });

            return this.fetchNewContent(answer.content);

        }

    }

    fetchNewContent(content){

        let newContentObjects = this.state.contentObjects;

        if (content.constructor !== Array) content = [content];

        for (let i=0; i<content.length; i++ ){

            let newObject = content[i].object;

            let bFound=false;
            for (let j=0; j<newContentObjects; j++)
                if (newContentObjects[j].id === newObject.id) {
                    bFound=true;
                    break;
                }

            if (!bFound)
                newContentObjects.push(newObject);
        }


        this.setState({
            contentObjects: newContentObjects,
        })

    }

    renderContent() {
        const objects = this.state.contentObjects;
        return (
            objects.map((object) =>
                <PreviewContent key={object.id} object={object}></PreviewContent>
            )
        );
    }

    render() {

        return (
            <PanelContainer controls={false} style={{marginBottom:0}}>


                <Hero style={{position: 'relative', zIndex: 2}}>

                    <HeroHeader>
                        <span>What's hot on SkyHub</span>
                    </HeroHeader>

                    <ForumsButtons/>

                    <p className='text-center' style={{marginTop: 25}}>
                        Already have a <strong>existing React project</strong> and not willing to make the transition to our starter-kits? No worries! We are now providing Rubix as a module which you can <strong>directly import</strong> into your existing projects.
                    </p>
                    <p className='text-center' style={{marginTop: 25}}>
                        Rubix 4.0 allows you to create static sites using a feature called <strong>distributables</strong>. These distributables can be deployed directly to any static server (e.g. Apache2 / Nginx etc).
                    </p>

                    {::this.renderContent()}

                </Hero>

            </PanelContainer>
        );
    }
}
