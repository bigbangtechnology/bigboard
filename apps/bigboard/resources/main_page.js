// ==========================================================================
// Project:   BB - mainPage
// Copyright: ©2010 Big Bang Technology, Inc.
// ==========================================================================
/*globals BB */



BB.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'header footer'.w(),
    
    header: SC.ToolbarView.design({
      anchorLocation: SC.ANCHOR_TOP,
      
      childViews: 'createTaskButton boardLabel'.w(),
      
      createTaskButton: SC.ButtonView.design({
        layout: { width: 200, left: 8, centerY: 0, height: 24 },
        title: 'Create Task'
      }),
      
      boardLabel: SC.LabelView.design({
        layout: { height: 18, left: 0, right: 0, centerY: 0 },
        value: 'bigbangtechnology',
        textAlign: SC.ALIGN_CENTER
      })
    }),
    
    footer: SC.ToolbarView.design({
      anchorLocation: SC.ANCHOR_BOTTOM,
      
      childViews: 'copyright'.w(),
      
      copyright: SC.LabelView.design({
        layout: { centerY: 0, height: 18, width: 200, right: 8 },
        value: 'Big Board by Big Bang Technology'
      })
    })
  })

});
