/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import Editor from 'corteza-webapp-admin/src/views/System/User/Editor'
import { shallowMount } from 'corteza-webapp-admin/tests/lib/helpers'
import fp from 'flush-promises'

describe('views/User/Editor.vue', () => {
  afterEach(() => {
    sinon.restore()
  })

  let $auth, $SystemAPI, propsData, $router, $store, stdReject
  beforeEach(() => {
    $auth = { is: sinon.stub().returns(true), check: sinon.stub().resolves() }
    $SystemAPI = {
      userRead: sinon.stub().resolves({ userID: '42' }),
      roleList: sinon.stub().resolves(),
      userMembershipList: sinon.stub().resolves(),
      userDelete: sinon.stub().resolves(),
      userUndelete: sinon.stub().resolves(),
      userUpdate: sinon.stub().resolves({ userID: '42' }),
      userCreate: sinon.stub().resolves({ userID: '42' }),
      userMembershipAdd: sinon.stub().resolves(),
      userMembershipRemove: sinon.stub().resolves(),
      userUnsuspend: sinon.stub().resolves(),
      userSuspend: sinon.stub().resolves(),
      userSetPassword: sinon.stub().resolves(),
    }
    propsData = {
      userID: 'userID',
    }
    $router = { push: sinon.spy() }
    $store = {
      dispatch: sinon.fake(),
    }
    sinon.stub(Editor, 'watch').get(() => ({}))
    stdReject = sinon.stub()
  })

  const mountEditor = (opt) => shallowMount(Editor, {
    mocks: { $auth, $SystemAPI, $router, $store },
    methods: { stdReject },
    propsData,
    ...opt,
  })

  describe('fetch user', () => {
    it('on success - set user', async () => {
      const wrap = mountEditor()
      wrap.vm.fetchUser()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userRead)
      expect(wrap.vm.user).to.not.deep.eq({})
    })

    it('on error - set error flag', async () => {
      $SystemAPI.userRead = sinon.stub().rejects()
      const wrap = mountEditor()
      wrap.vm.fetchUser()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userRead)
      sinon.assert.calledOnce(stdReject)
    })
  })

  describe('fetch user roles', () => {
    it('on success - set roles', async () => {
      const roleList = { set: [{ roleID: '2' }, { roleID: '3' }] }
      const userMembershipList = ['2']
      const expected = [ { roleID: '2', current: true, dirty: true }, { roleID: '3', current: false, dirty: false } ]
      $SystemAPI.roleList = sinon.stub().resolves(roleList)
      $SystemAPI.userMembershipList = sinon.stub().resolves(userMembershipList)
      const wrap = mountEditor()
      wrap.vm.fetchUserRoles()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleList)
      sinon.assert.calledOnce($SystemAPI.userMembershipList)
      expect(wrap.vm.userRoles).to.deep.eq(expected)
    })

    it('on success - ignore roleID 1', async () => {
      const roleList = { set: [{ roleID: '1' }] }
      const userMembershipList = ['1']
      const expected = []
      $SystemAPI.roleList = sinon.stub().resolves(roleList)
      $SystemAPI.userMembershipList = sinon.stub().resolves(userMembershipList)
      const wrap = mountEditor()
      wrap.vm.fetchUserRoles()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleList)
      sinon.assert.calledOnce($SystemAPI.userMembershipList)
      expect(wrap.vm.userRoles).to.deep.eq(expected)
    })

    it('on error - role list - set error flag', async () => {
      $SystemAPI.roleList = sinon.stub().rejects()
      const wrap = mountEditor()
      wrap.vm.fetchUserRoles()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleList)
      sinon.assert.notCalled($SystemAPI.userMembershipList)
      sinon.assert.calledOnce(stdReject)
    })

    it('on error - user membership - set error flag', async () => {
      $SystemAPI.roleList = sinon.stub().resolves({})
      $SystemAPI.userMembershipList = sinon.stub().rejects()
      const wrap = mountEditor()
      wrap.vm.fetchUserRoles()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleList)
      sinon.assert.calledOnce($SystemAPI.userMembershipList)
      sinon.assert.calledOnce(stdReject)
    })
  })

  describe('delete user', () => {
    it('on success - redirect', async () => {
      const wrap = mountEditor()
      wrap.vm.onDelete()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userDelete)
    })

    it('on error - set error flag', async () => {
      $SystemAPI.userDelete = sinon.stub().rejects()
      const wrap = mountEditor()
      wrap.vm.onDelete()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userDelete)
      sinon.assert.calledOnce(stdReject)
    })
  })

  describe('undelete user', () => {
    it('on success - redirect', async () => {
      const wrap = mountEditor()
      const user = { deletedAt: 'TIME' }
      wrap.setData({ user })
      wrap.vm.onDelete()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userUndelete)
      sinon.assert.calledOnce($SystemAPI.userRead)
    })

    it('on error - set error flag', async () => {
      $SystemAPI.userUndelete = sinon.stub().rejects()
      const wrap = mountEditor()
      const user = { deletedAt: 'TIME' }
      wrap.setData({ user })
      wrap.vm.onDelete()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userUndelete)
      sinon.assert.calledOnce(stdReject)
    })
  })

  describe('update user', () => {
    it('on success - set user', async () => {
      const wrap = mountEditor()
      wrap.vm.onInfoSubmit({ userID: 'userID' })

      await fp()
      sinon.assert.calledOnce($SystemAPI.userUpdate)
      expect(wrap.vm.user).to.not.deep.eq({})
      expect(wrap.vm.info.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      $SystemAPI.userUpdate = sinon.stub().rejects()
      const wrap = mountEditor()
      wrap.vm.onInfoSubmit({ userID: 'userID' })

      await fp()
      sinon.assert.calledOnce($SystemAPI.userUpdate)
      sinon.assert.calledOnce(stdReject)
      expect(wrap.vm.info.processing).to.be.false
    })
  })

  describe('create user', () => {
    it('on success - redirect', async () => {
      propsData.userID = undefined
      const wrap = mountEditor()
      wrap.vm.onInfoSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userCreate)
      sinon.assert.calledOnce($router.push)
      expect(wrap.vm.info.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      propsData.userID = undefined
      $SystemAPI.userCreate = sinon.stub().rejects()
      const wrap = mountEditor()
      wrap.vm.onInfoSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userCreate)
      sinon.assert.calledOnce(stdReject)
      expect(wrap.vm.info.processing).to.be.false
    })
  })

  describe('update roles', () => {
    it('on success - re-fetch roles', async () => {
      const userRoles = [
        { roleID: '2', current: false, dirty: false },
        { roleID: '3', current: true, dirty: false },
        { roleID: '4', current: false, dirty: true },
        { roleID: '6', current: true, dirty: true },
      ]
      const fetchUserRoles = sinon.stub()
      const wrap = mountEditor({ methods: { fetchUserRoles } })
      wrap.setData({ userRoles })
      wrap.vm.onRoleSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userMembershipAdd)
      sinon.assert.calledWith($SystemAPI.userMembershipAdd, { roleID: '4', userID: 'userID' })
      sinon.assert.calledOnce($SystemAPI.userMembershipRemove)
      sinon.assert.calledWith($SystemAPI.userMembershipRemove, { roleID: '3', userID: 'userID' })

      sinon.assert.calledOnce(fetchUserRoles)
      expect(wrap.vm.roles.processing).to.be.false
    })

    it('on error - add - set error flag', async () => {
      $SystemAPI.userMembershipAdd = sinon.stub().rejects()
      const userRoles = [
        { roleID: '4', current: false, dirty: true },
      ]
      const wrap = mountEditor()
      wrap.setData({ userRoles })
      wrap.vm.onRoleSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userMembershipAdd)
      sinon.assert.calledOnce(stdReject)
      expect(wrap.vm.roles.processing).to.be.false
    })

    it('on error - remove - set error flag', async () => {
      $SystemAPI.userMembershipRemove = sinon.stub().rejects()
      const userRoles = [
        { roleID: '3', current: true, dirty: false },
      ]
      const wrap = mountEditor()
      wrap.setData({ userRoles })
      wrap.vm.onRoleSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userMembershipRemove)
      sinon.assert.calledOnce(stdReject)
      expect(wrap.vm.roles.processing).to.be.false
    })
  })

  describe('status change', () => {
    it('on success - unsuspend - re-fetch user', async () => {
      const wrap = mountEditor()
      const user = { suspendedAt: 'TIME' }
      wrap.setData({ user })
      wrap.vm.onStatusChange()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userUnsuspend)
      sinon.assert.calledOnce($SystemAPI.userRead)
    })

    it('on error - unsuspend - set error flag', async () => {
      $SystemAPI.userUnsuspend = sinon.stub().rejects()
      const wrap = mountEditor()
      const user = { suspendedAt: 'TIME' }
      wrap.setData({ user })
      wrap.vm.onStatusChange()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userUnsuspend)
      sinon.assert.calledOnce(stdReject)
    })

    it('on success - suspend - re-fetch user', async () => {
      const wrap = mountEditor()
      const user = { suspendedAt: undefined }
      wrap.setData({ user })
      wrap.vm.onStatusChange()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userSuspend)
      sinon.assert.calledOnce($SystemAPI.userRead)
    })

    it('on error - suspend - set error flag', async () => {
      $SystemAPI.userSuspend = sinon.stub().rejects()
      const wrap = mountEditor()
      const user = { suspendedAt: undefined }
      wrap.setData({ user })
      wrap.vm.onStatusChange()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userSuspend)
      sinon.assert.calledOnce(stdReject)
    })
  })

  describe('password change', () => {
    it('on success', async () => {
      const wrap = mountEditor()
      wrap.vm.onPasswordSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userSetPassword)
      expect(wrap.vm.password.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      $SystemAPI.userSetPassword = sinon.stub().rejects()
      const wrap = mountEditor()
      wrap.vm.onPasswordSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userSetPassword)
      sinon.assert.calledOnce(stdReject)
      expect(wrap.vm.password.processing).to.be.false
    })
  })
})
