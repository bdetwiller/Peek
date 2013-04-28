class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name
      t.datetime :start
      t.datetime :end
      t.decmial :latitude
      t.decimal :longitude

      t.timestamps
    end
  end
end
