import React from "react";
import Notification from "./Notification.model";


export default class NotificationMenu  extends React.Component {


  componentDidMount() {
    requestAnimationFrame(() => { //Make sure it is on client only


      }
    );
  }

  render() {


      let notification1 = new Notification({
        body: '3323',
        destinationId: '2145',
        senderId: '4151251',
        description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
        id: '425151',
        dtCreation: '23/jan/1987',
        template: '',
        title: 'so such a lovly twist'
      });
      let notification2 = new Notification({
        body: '3323',
        destinationId: '2145',
        senderId: '4151251',
        description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
        id: '425151',
        dtCreation: '23/jan/1987',
        template: '',
        title: 'so such a lovly twist'
      });

      const notificationsx = [notification1,notification2];


     const listNotifications =  notificationsx.map((notification) =>


           <li>
             <div className="dropdown-messages-box">
               <a href="profile.html" className="pull-left">

               </a>
               <div>

                 <small className="pull-right">46h ago</small>
                 <strong>dddd
                 </strong> started following <strong>{notification.destinationId}</strong>. <br/>
                 <small className="text-muted">{notification.dtCreation}</small>
               </div>
             </div>
           </li>



     );


     return (
       <li className="dropdown">

         <a className="dropdown-toggle count-info" data-toggle="dropdown" href="#">
           <i className="fa fa-envelope"></i>  <span className="label label-warning">16</span>
         </a>
         <ul className="dropdown-menu dropdown-messages">

            xxxxx

             {listNotifications}

          </ul>
       </li>
       );





    }


}
