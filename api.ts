//% block="Story" color="#b36634" icon="\uf02d"
//% groups='["Text","Movement","Cutscene","Menu"]'
namespace story {
    export interface Task {
        isDone(): boolean;
        key?: string;
        cancel?: () => void;
    }
}