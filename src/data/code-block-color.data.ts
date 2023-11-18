type CodeBlockColor = {
  [key: string]: {
    bgColor: string;
    color: string;
    icon: string;
  };
};

export const codeBlockColor: CodeBlockColor = {
  TEXT: { color: '#ffffff', bgColor: '#444444', icon: 'tabler:code', },
  HTML: { color: '#ffffff', bgColor: '#e64c18', icon: 'teenyicons:html5-solid', },
  CSS: { color: '#ffffff', bgColor: '#264de4', icon: 'teenyicons:css3-solid', },
  JS: { color: '#333333', bgColor: '#f0db4f', icon: 'teenyicons:javascript-solid', },
  JAVASCRIPT: { color: '#333333', bgColor: '#f0db4f', icon: 'teenyicons:javascript-solid', },
  TS: { color: '#ffffff', bgColor: '#007acc', icon: 'teenyicons:typescript-solid', },
  TYPESCRIPT: { color: '#ffffff', bgColor: '#007acc', icon: 'teenyicons:typescript-solid', },
  REACT: { color: '#ffffff', bgColor: '#007acc', icon: 'teenyicons:react-solid', },
  JSON: { color: '#ffffff', bgColor: '#888888', icon: 'mdi:code-json', },
  BASH: { color: '#ffffff', bgColor: '#666666', icon: 'simple-icons:gnubash', },
  PYTHON: { color: '#ffd342', bgColor: '#3673a5', icon: 'simple-icons:python', },
  JAVA: { color: '#e76f00', bgColor: '#5382a1', icon: 'cib:java', },
  YAML: { color: '#ffffff', bgColor: '#888888', icon: 'simple-icons:yaml', },
};
