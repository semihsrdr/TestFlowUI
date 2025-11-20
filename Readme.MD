🛠️ Recommended Tech Stack

For a Junior Engineer, this stack strikes the perfect balance between "Industrial Standard" and "Ease of Use."

    Framework: React (Huge community support, standard for modern web apps).

    Build Tool: Vite (Much faster and lighter than the old create-react-app).

    Language: TypeScript (Essential for "Type Safety" to prevent data/ID errors between backend and frontend).

    UI Library: Ant Design (AntD).

        Why? It comes with pre-built "Enterprise" components like complex Tables, Breadcrumbs, Layouts, and Transfer Lists. It reduces CSS work by 90%.

    Gherkin Editor: @monaco-editor/react.

        Why? This is the web version of VS Code. It supports syntax highlighting for Gherkin (coloring Given, When, Then).

    Data Fetching: TanStack Query (React Query) + Axios.

        Why? Automatically handles "Loading" spinners, "Error" states, and data caching.

    Routing: React Router v6.

    State Management: Zustand (Much simpler and lighter than Redux).

🗺️ Step-by-Step Specific Roadmap

Step 1: Project Setup, Layout & Navigation

The goal is to build the skeleton. Even if pages are empty, navigation must work smoothly.

    Setup: Initialize a React + TypeScript project using npm create vite@latest.

    Layout Design: Use Ant Design's ProLayout or standard Layout component.

        Sidebar: Menu items -> Dashboard, Test Library, Test Plans, Runs.

        Header: User info, Logout button.

    📍 Breadcrumbs Integration:

        Use the useLocation hook (from React Router) to dynamically generate the breadcrumb path based on the URL.

        Example: If the user visits /plans/create, the top bar renders: Home / Plans / Create Plan.

Step 2: Dashboard (Monitoring & Visualization)

The "Command Center" that greets the user.

    Grid System: Use AntD Row and Col to divide the screen into 3 or 4 columns.

    Cards: Use AntD Card and Statistic components.

        Example: <Statistic title="Total Tests" value={120} prefix={<Icon />} />

    Activity List: A simple Table component showing "Recent Runs" (Use dummy JSON data until the backend is ready).

Step 3: Test Library & Monaco Editor

The core feature for creating tests.

    List View: Use the Table component. Columns: ID, Name, Tags, Actions (Edit/Delete).

        Feature: Add an Input.Search above the table for filtering.

    Create/Edit Page:

        Left Side: Inputs for Test Name and Tags (Use AntD Select with mode="tags").

        Right/Center: Embed <MonacoEditor language="gherkin" theme="vs-dark" />.

        As the user types in the editor, update the local state.

Step 4: Test Plan Builder (The Transfer Module)

The logic for selecting tests and packaging them into a plan.

    Component: Use the Ant Design Transfer component. This fits your requirement perfectly.

        Left Box: Source (All available tests in Library).

        Right Box: Target (Tests selected for this Plan).

        Center: Automatic buttons to move items left/right.

    Plan Settings: A simple form for "Plan Name" and "Environment" (e.g., Dev/Stage).

Step 5: Execution & Live Monitoring

Triggering the plan and watching it run.

    Execution: A large "Run" button on the Plan Detail page. Clicking it sends a POST request to your API.

    Polling (Live Status): Use React Query's refetchInterval feature.

        Logic: "Check the status API every 3 seconds."

    Visuals:

        Status: Use AntD Badge (Status="processing" / "success").

        Progress: Use AntD Progress bar (increases as tests finish).

        Logs: A black-background div to display live logs streaming from the backend.