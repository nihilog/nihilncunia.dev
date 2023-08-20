type CodeBlockColor = {
  [key: string]: {
    bgColor: string;
    color: string;
    icon: string;
  };
};

export const codeBlockColor: CodeBlockColor = {
  HTML: { color: '#ffffff', bgColor: '#e64c18', icon: 'teenyicons:html5-solid', },
  CSS: { color: '#ffffff', bgColor: '#264de4', icon: 'teenyicons:css3-solid', },
  JS: { color: '#333333', bgColor: '#f0db4f', icon: 'teenyicons:javascript-solid', },
  JAVASCRIPT: { color: '#333333', bgColor: '#f0db4f', icon: 'teenyicons:javascript-solid', },
  JSX: { color: '#20232a', bgColor: '#61dafb', icon: 'teenyicons:react-solid', },
  TS: { color: '#ffffff', bgColor: '#007acc', icon: 'teenyicons:typescript-solid', },
  TYPESCRIPT: { color: '#ffffff', bgColor: '#007acc', icon: 'teenyicons:typescript-solid', },
  TSX: { color: '#ffffff', bgColor: '#007acc', icon: 'teenyicons:react-solid', },
  JSON: { color: '#ffffff', bgColor: '#888888', icon: 'mdi:code-json', },
  BASH: { color: '#ffffff', bgColor: '#293036', icon: 'simple-icons:gnubash', },
  PYTHON: { color: '#ffd342', bgColor: '#3673a5', icon: 'simple-icons:python', },
  JAVA: { color: '#e76f00', bgColor: '#5382a1', icon: 'cib:java', },
  YAML: { color: '#ffffff', bgColor: '#888888', icon: 'simple-icons:yaml', },
};