# II Openathon Custom Open Cloud

You are welcomed to a new **Openathon** edition organised for the **Accenture Technology Custom Open Cloud community** where we will have again the opportunity to discover, in a practical way, the possibilities offered by the different architectures and leading frameworks in the market.

As you already knows, this time we will learn to develop a **FrontEnd web application using React** applying some of the recommended best practices such as routing, asynchronous REST API access, reusable components and state management.

React’s strongest capability is the creation of web interfaces based on reusable components, so we are going to create and reuse our own components while learning how to manage their life cycle, the management of props and the JSX syntax while exercising our knowledge of JavaScript (ES6).



# What we are going to do
We will learn how to develop a web application using React, playing with **props**, **JSX**, **Virtual DOM**, **components**, routing, REST API consumption, components reuse… and applying some of the recommended good practises like **Single responsibility principle**, **Isolation**, **functional programming**, **prototypal inheritance**…

1. The web application will consist on a Main and two detail pages:

<img src="https://github.com/Albarian/openathonFY19/raw/master/resources/images/web%20map.png" width="315">

2. With the next React components hierarchy:
<img src="https://github.com/Albarian/openathonFY19/raw/master/resources/images/components%20use.png" width="608">

3. Using a fake REST API emulating [Accenture site](https://www.accenture.com/us-en/company) data services:
<img src="https://github.com/Albarian/openathonFY19/raw/master/resources/images/components%20and%20API.png" width="456">

4. Having this simulated estructure (Main page)
<img src="https://github.com/Albarian/openathonFY19/raw/master/resources/images/main%20page%20mockup.png" width="756">



# Prerequisites

It will be useful to install 

1. Install **Visual Studio Code** for your current Operating System: 
    [Click here](https://code.visualstudio.com/) to download.

    **Visual Studio Code** is a source code editor with support for debugging, embedded Git control, syntax highlighting, intelligent code completion, snippets, and code refactoring.

2. Install **Node.js** for your current Operating System: 

    [Click here](https://nodejs.org/en/download/) to download.

    **Node.js** is an open source server environment, free, that runs on various platforms (Windows, Linux, Unix, Mac OS X, etc.)  using JavaScript runtime built on Chrome's V8 JavaScript engine.

    This installation also will install **npm**, the package manager for Node.js and the world’s largest software registry. 

3. Install **webpack**
    ```
    $ npm install webpack -g
    ```
    
    **webpack** is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging ... [More info](https://webpack.js.org/).

4. Install ***json-server***
    
    ```sh
    $ npm install json-server -g
    ```

    JSON Server is a Node Module that you can use to create demo rest json webservice in less than a minute. All you need is a JSON file for sample data. https://github.com/typicode/json-server
    

Create a `api.json` file with the next content

  <details>
  <summary>api.json (click to expand)</summary>
<p>

```json
{
    "general": {
        "what_we_do": "Accenture solves our clients' toughest challenges by providing unmatched services in strategy, consulting, digital, technology and operations. We partner with more than three-quarters of the Fortune Global 500, driving innovation to improve the way the world works and lives. With expertise across more than 40 industries and all business functions, we deliver transformational outcomes for a demanding new digital world.",
        "how_we_innovate": "In today's business environment, companies need to continually reinvent themselves. At Accenture, we take an innovation-led approach to help clients imagine and invent their future. Through the Accenture Innovation Architecture, we combine our capabilities to invent, develop, and deliver disruptive innovations for clients, and to scale them faster.",
        "what_we_believe": "Our core values shape the culture and define the character of our company. We live the core values through individual behaviors. They serve as a foundation in how we act and make decisions.",
        "link": "https://www.accenture.com/us-en/company",
        "logo": "https://www.accenture.com/t20180820T081710Z__w__/us-en/_acnmedia/Accenture/Dev/Redesign/Acc_Logo_Black_Purple_RGB.PNG"
    },
    "services": [
        {
            "id": 1,
            "name": "Accenture Strategy",
            "description": "Shapes the future at the intersection of business and technology",
            "link": "https://www.accenture.com/us-en/strategy-index",
            "image_link": "https://www.accenture.com/t20170202T002325Z__w__/us-en/_acnmedia/Accenture/Dev/ComponentImages/Accenture-Strategy.svgla=en"
        },
        {
            "id": 2,
            "name": "Accenture Consulting",
            "description": "Transforms businesses through industry expertise and insights",
            "link": "https://www.accenture.com/us-en/consulting-index",
            "image_link": "https://www.accenture.com/t20170718T181228Z__w__/us-en/_acnmedia/Accenture/Dev/ComponentImages/Accenture-Consulting.svgla=en"
        },
        {
            "id": 3,
            "name": "Accenture Digital",
            "description": "Creates value through new experiences, new intelligence and new connections",
            "link": "https://www.accenture.com/us-en/digital-index",
            "image_link": "https://www.accenture.com/t20170202T003021Z__w__/us-en/_acnmedia/Accenture/Dev/ComponentImages/Accenture-Digital.svgla=en"
        },
        {
            "id": 4,
            "name": "Accenture Technology",
            "description": "Powers businesses with cutting-edge solutions using established and emerging technologies",
            "link": "https://www.accenture.com/us-en/technology-index",
            "image_link": "https://www.accenture.com/t20170202T002530Z__w__/us-en/_acnmedia/Accenture/Dev/ComponentImages/Accenture-Technology.svgla=en"
        },
        {
            "id": 5,
            "name": "Accenture Operations",
            "description": "Delivers outcomes through infrastructure, security, cloud and business process services",
            "link": "https://www.accenture.com/us-en/business-operations-index",
            "image_link": "https://www.accenture.com/t20170202T002910Z__w__/us-en/_acnmedia/Accenture/Dev/ComponentImages/Accenture-Operations.svgla=en"
        }
    ],
    "innovation": [
        {
            "id": 1,
            "name": "Accenture Research",
            "description": "Uncover insights & shape trends. Accenture Research identifies and anticipates game-changing business, market and technology trends through provocative thought leadership. Our 250 researchers partner with world-class organizations such as MIT and Singularity to discover innovative solutions for our clients.",
            "link": "https://www.accenture.com/us-en/innovation-architecture-accenture-research",
            "image_link": "https://www.accenture.com/t20170202T023946Zw320/us-en/_acnmedia/Accenture/Conversion-Assets/DotCom/Images/About-Accenture/Global/24/Accenture-Research-thumbnail.jpg?h=272&w=320&la=en&hash=D591063E9CE368389B3616A4DC2A523D6510C5D2"
        },
        {
            "id": 2,
            "name": "Accenture Ventures",
            "description": "Partner with growth-stage companies. Accenture Ventures partners with and invests in growth-stage companies that create innovative enterprise technologies using an open innovation approach.",
            "link": "https://www.accenture.com/us-en/innovation-architecture-accenture-ventures",
            "image_link": "https://www.accenture.com/t20170202T023946Zw320/us-en/_acnmedia/Accenture/Conversion-Assets/DotCom/Images/About-Accenture/Global/24/Accenture-Ventures-thumbnail.jpg?h=272&w=320&la=en&hash=784522A916940DD8E12D41280E32D9EF95960E22"
        },
        {
            "id": 3,
            "name": "Accenture Labs",
            "description": "Research and incubate new concepts. Accenture Labs does cutting edge research and incubates new concepts through applied R&D projects that have a significant near-term impact on our clients’ businesses.",
            "link": "https://www.accenture.com/us-en/innovation-architecture-accenture-labs",
            "image_link": "https://www.accenture.com/t20170202T023946Zw320/us-en/_acnmedia/Accenture/Conversion-Assets/DotCom/Images/About-Accenture/Global/24/Accenture-Labs-thumbnail.jpg?h=272&w=320&la=en&hash=49566586DCD64156005298C498AB7A6CF4ED1835"
        },
        {
            "id": 4,
            "name": "Accenture Studios",
            "description": "Build solutions with speed and agility. Accenture Studios focus on a range of specializations from rapid application development to service design and digital project creation to mobile apps and digital services.",
            "link": "https://www.accenture.com/us-en/innovation-architecture-accenture-studios",
            "image_link": "https://www.accenture.com/t20170202T023947Zw320/us-en/_acnmedia/Accenture/Conversion-Assets/DotCom/Images/About-Accenture/Global/24/Accenture-Studios-thumbnail.jpg?h=272&w=320&la=en&hash=0597771DC2CCB2305E6732655DC277789AA983E5"
        },
        {
            "id": 5,
            "name": "Accenture Innovation Centers",
            "description": "Demonstrate and scale industry solutions. Accenture Innovation Centers are located strategically worldwide, building and scaling solutions across technologies and industries.",
            "link": "https://www.accenture.com/us-en/innovation-architecture-accenture-innovation-centers",
            "image_link": "https://www.accenture.com/t20170202T023947Zw320/us-en/_acnmedia/Accenture/Conversion-Assets/DotCom/Images/About-Accenture/Global/24/Accenture-Innovation-Centers-thumbnail.jpg?h=272&w=320&la=en&hash=3BE06BA4821152C6218DE3CF1BEB00C012988A03"
        },
        {
            "id": 6,
            "name": "Accenture Delivery Centers",
            "description": "Deliver Innovation. Accenture Delivery Centers industrialize the delivery of our innovations to unlock the power of New IT and transform business processes through our unparalleled network across more than 50 locations.",
            "link": "https://www.accenture.com/us-en/innovation-architecture-accenture-delivery-centers",
            "image_link": "https://www.accenture.com/t20170202T023947Zw320/us-en/_acnmedia/Accenture/Conversion-Assets/DotCom/Images/About-Accenture/Global/24/Accenture-Delivery-Centers-thumbnail.jpg?h=272&w=320&la=en&hash=9BE0E46048A7EEB342DEBB60F36E03011D6A6240"
        }
    ],
    "believes": [
        {
            "id": 1,
            "title": "CLIENT VALUE CREATION",
            "description": "Enabling clients to become high-performance businesses and creating long-term relationships by being responsive and relevant and by consistently delivering value."
        },
        {
            "id": 2,
            "title": "ONE GLOBAL NETWORK",
            "description": "Leveraging the power of global insight, relationships, collaboration and learning to deliver exceptional service to clients wherever they do business."
        },
        {
            "id": 3,
            "title": "RESPECT FOR THE INDIVIDUAL",
            "description": "Valuing diversity and unique contributions, fostering a trusting, open and inclusive environment and treating each person in a manner that reflects Accenture's values."
        },
        {
            "id": 4,
            "title": "BEST PEOPLE",
            "description": "Attracting, developing and retaining the best talent for our business, challenging our people, demonstrating a 'can-do' attitude and fostering a collaborative and supportive environment. "
        },
        {
            "id": 5,
            "title": "INTEGRITY",
            "description": "Being ethically unyielding and honest and inspiring trust by saying what we mean, matching our behaviors to our words and taking responsibility for our actions."
        },
        {
            "id": 6,
            "title": "STEWARDSHIP",
            "description": "Fulfilling our obligation of building a better, stronger and more durable company for future generations, protecting the Accenture brand, meeting our commitment to stakeholders, acting with an owner mentality, developing our people and helping improve communities and the global environment."
        }
    ]
}
```

</p>
</details>



    Start JSON Server

    ```bash
    json-server --watch db.json
    ```

    Now if you go to [http://localhost:3000/](http://localhost:3000/), you'll get the fake API working.


5. Download and install React Developer Tools

    React Developer Tools is a Chrome DevTools extension for the open-source React JavaScript library. It allows you to inspect the React component hierarchies in the Chrome Developer Tools.

    [Click here](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) to download and install.

    You will get a new tab called React in your Chrome DevTools. This shows you the root React components that were rendered on the page, as well as the subcomponents that they ended up rendering.

    By selecting one of the components in the tree, you can inspect and edit its current props and state in the panel on the right. In the breadcrumbs you can inspect the selected component, the component that created it, the component that created that one, and so on.

