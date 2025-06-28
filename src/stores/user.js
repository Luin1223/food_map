import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', { //定義一個名為"user"的store，用來管理使用者資訊
  state: () => ({ //store中的初始狀態
    name: '',
    picture: '',
    token: ''
  }),
  actions: { //定義了三個方法(可以理解為功能)
    setUser({ name, picture, token }) { //設定使用者資訊(通常登入後呼叫)
      this.name = name; //把登入回傳的name、pivture、token 存在Pinia state裡
      this.picture = picture;
      this.token = token;

      // 再把整個使用者資訊存到 localStorage，確保重整後能保留登入狀態
      localStorage.setItem('user', JSON.stringify({ name, picture, token }));
    },
    loadUserFromStorage() { //從localStorage讀取使用者資訊，回寫進Pinia state
      //app初始化時呼叫，確保曾經登入過，重整還會自動登入
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.name = user.name || '';
      this.picture = user.picture || '';
      this.token = user.token || '';
    },
    logout() { //登出時清除Pinia狀態+localStorage資料
      this.name = '';
      this.picture = '';
      this.token = '';
      localStorage.removeItem('user');
    }
  }
});